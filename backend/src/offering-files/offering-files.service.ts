import { ResponseOfferingFileDto } from '@myideaswork/common/dtos';
import { OfferingFile } from '@myideaswork/common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { OfferingFiles } from './offering-files.entity';

@Injectable()
export class OfferingFilesService {
   constructor(
      @InjectRepository(OfferingFiles)
      private offeringFilesRepository: Repository<OfferingFiles>,
   ) {}

   mapOfferingsFileToResponseDto(offeringFiles: OfferingFile[]): ResponseOfferingFileDto[] {
      return offeringFiles.map((offeringFile: OfferingFile) =>
         this.mapOfferingFileToResponseDto(offeringFile),
      );
   }

   mapOfferingFileToResponseDto(offeringFile: OfferingFile): ResponseOfferingFileDto {
      return plainToClass(ResponseOfferingFileDto, instanceToPlain(offeringFile), {
         excludeExtraneousValues: true,
      });
   }
}

