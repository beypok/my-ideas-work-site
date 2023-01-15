import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferingFileFtpService } from './offering-file-ftp.service';
import { OfferingFilesController } from './offering-files.controller';
import { OfferingFiles } from './offering-files.entity';
import { OfferingFilesService } from './offering-files.service';

@Module({
   imports: [TypeOrmModule.forFeature([OfferingFiles])],
   controllers: [OfferingFilesController],
   providers: [OfferingFilesService, OfferingFileFtpService],
   exports: [OfferingFilesService, OfferingFileFtpService],
})
export class OfferingFilesModule {}

