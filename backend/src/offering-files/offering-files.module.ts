import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferingFilesController } from './offering-files.controller';
import { OfferingFiles } from './offering-files.entity';
import { OfferingFilesService } from './offering-files.service';

@Module({
   imports: [TypeOrmModule.forFeature([OfferingFiles])],
   controllers: [OfferingFilesController],
   providers: [OfferingFilesService],
})
export class OfferingFilesModule {}

