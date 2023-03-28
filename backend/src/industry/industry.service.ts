import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { EncryptionService } from 'src/encryption/encryption.service';
import { DeleteResult, In, Repository } from 'typeorm';
import {Industry} from "./industry.entity";
import {ResponseIndustryDto} from "@myideaswork/common/dtos";

@Injectable()
export class IndustryService {
   constructor(
      @InjectRepository(Industry)
      private industryRepository: Repository<Industry>,
      private encryptionService: EncryptionService,
   ) {}

   findByIds(ids: number[]): Promise<Industry[]> {
      return this.industryRepository.find({ where: { id: In(ids) } });
   }

   findById(id: number): Promise<Industry> {
      return this.industryRepository.findOne({ where: { id } });
   }

   // async createIndustry(industry: CreateIndustryDto): Promise<Industry> {
   //    try {
   //       return await this.industryRepository.save({
   //          ...industry
   //       });
   //    } catch (e: any) {
   //       if (e.message) {
   //          throw new BadRequestException(e.message);
   //       }
   //    }
   // }
   deleteById(id: number): Promise<DeleteResult> {
      return this.industryRepository.delete({ id });
   }

   mapIndustriesToResponseDto(industries: Industry[]): ResponseIndustryDto[] {
      return industries.map((industry: Industry) => this.mapIndustryToResponseDto(industry));
   }

   mapIndustryToResponseDto(industry: Industry): ResponseIndustryDto {
      return plainToClass(ResponseIndustryDto, instanceToPlain(industry), {
         excludeExtraneousValues: true,
      });
   }
}

