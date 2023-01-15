import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { Request, UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { OfferingFileFtpService } from './offering-file-ftp.service';
import { OfferingFilesService } from './offering-files.service';

@Controller('/offering-files')
export class OfferingFilesController {
   constructor(
      private readonly offeringFilesService: OfferingFilesService,
      private readonly offeringFileFtpService: OfferingFileFtpService,
   ) {}

   @Post('/upload')
   @UseInterceptors(FileInterceptor('file'))
   async upload(
      @UploadedFile() file,
      @Body('offeringId') offeringId: number,
      @Request() req,
   ): Promise<{ url: string }> {
      return this.offeringFileFtpService.uploadFile(file, file.originalname, offeringId);
   }
}

