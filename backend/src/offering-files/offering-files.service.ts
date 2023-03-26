import { CreateOfferingFileDto, ResponseOfferingFileDto } from '@myideaswork/common/dtos';
import { OfferingFile } from '@myideaswork/common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { DeleteResult, In, Repository } from 'typeorm';
import { OfferingFiles } from './offering-files.entity';

@Injectable()
export class OfferingFilesService {
   constructor(
      @InjectRepository(OfferingFiles)
      private offeringFilesRepository: Repository<OfferingFiles>,
   ) {}

   async createOfferingFiles(files: CreateOfferingFileDto[]): Promise<OfferingFiles[]> {
      const filteredFiles = await this.getFilesThatDontAlreadyExistForOffering(files);
      return this.offeringFilesRepository.save(filteredFiles);
   }

   async getFilesThatDontAlreadyExistForOffering(
      files: CreateOfferingFileDto[],
   ): Promise<CreateOfferingFileDto[]> {
      if (files.length === 0) return [];
      const offeringMatches = await this.getMatchingOfferingFiles(files);
      return files.filter(
         (f) => !offeringMatches.some((om) => om.offeringId === f.offeringId && om.name === f.name),
      );
   }

   async getMatchingOfferingFiles(files: CreateOfferingFileDto[]): Promise<OfferingFiles[]> {
      const whereConditions = files.map((f) => {
         return { offeringId: f.offeringId, name: f.name };
      });
      return this.offeringFilesRepository.find({ where: whereConditions });
   }

   async deleteFilesThatAlreadyExistForOffering(
      files: CreateOfferingFileDto[],
   ): Promise<DeleteResult> {
      const offeringMatches = await this.getMatchingOfferingFiles(files);
      if (offeringMatches.length === 0) return;
      return this.deleteFilesByIds(offeringMatches.map((o) => o.offeringFileId));
   }

   async deleteFilesByIds(ids: number[]): Promise<DeleteResult> {
      return this.offeringFilesRepository.delete({ offeringFileId: In(ids) });
   }

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

