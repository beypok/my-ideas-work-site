import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {instanceToPlain, plainToClass} from 'class-transformer';
import {Repository} from 'typeorm';
import {Industry} from "./industry.entity";
import {ResponseIndustryDto} from "@myideaswork/common/dtos";

@Injectable()
export class IndustryService {
    constructor(
        @InjectRepository(Industry)
        private industryRepository: Repository<Industry>
    ) {
    }

    async findAll() {
        try {
            return await this.industryRepository.find();
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async findOne(id: number): Promise<Industry> {
        try {
            return await this.industryRepository.findOne({
                where: {id: id},
            });
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async create(industry: Industry): Promise<Industry> {
        try {
            return await this.industryRepository.save(industry);
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async update(id: number, industry: Industry): Promise<Industry> {
        try {
            const updatedIndustry = await this.industryRepository.preload({
                id: +id,
                ...industry,
            });
            return await this.industryRepository.save(updatedIndustry);
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await this.industryRepository.delete(id);
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
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

