import { BadRequestException, StreamableFile } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import * as ftp from 'basic-ftp';
import { OfferingFilesService } from './offering-files.service';

@Injectable()
export class OfferingFileFtpService {
   private client: ftp.Client;
   private ftpConfig: ftp.AccessOptions;

   constructor(private readonly offeringFileService: OfferingFilesService) {
      this.ftpConfig = {
         host: process.env.FTP_HOST,
         user: process.env.FTP_USERNAME,
         password: process.env.FTP_PASSWORD,
         port: +process.env.FTP_PORT,
         secure: true,
         secureOptions: { rejectUnauthorized: false },
      };
   }

   async createFTPConnection() {
      this.client = new ftp.Client();
      this.client.ftp.verbose = false;
      await this.client.access(this.ftpConfig);
   }

   async uploadFile(file: any, fileName: string, offeringId: number): Promise<{ url: string }> {
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > 10)
         throw new BadRequestException(`File must be under 10 MB (${file.originalname})`);

      const acceptedFileTypes = [
         'pdf',
         'doc',
         'docx',
         'xls',
         'xlsx',
         'ppt',
         'pptx',
         'rtf',
         'txt',
         'jpg',
         'png',
         'tiff',
         'gif',
         'jpeg',
      ];
      const fileType = file.originalname.split('.').pop();
      if (!acceptedFileTypes.includes(fileType))
         throw new BadRequestException(
            `File cannot be of type ${fileType}. Currently only ${acceptedFileTypes.join(
               ', ',
            )} files types are supported`,
         );

      const remotePath = `${offeringId}-${fileName}`;
      await this.offeringFileService.deleteFilesThatAlreadyExistForOffering([
         { name: fileName, offeringId, url: '', file },
      ]);

      await this.createFTPConnection();
      const res = await new Promise<{ url: string }>((resolve, reject) => {
         return this.client
            .uploadFrom(new StreamableFile(file.buffer).getStream(), remotePath)
            .then((res) => {
               resolve({ url: `https://myideaswork.online/offering-files/${remotePath}` });
            })
            .catch((err) => {
               reject(err);
            });
      });

      this.client.close();
      return res;
   }
}
