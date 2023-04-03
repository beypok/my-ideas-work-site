import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {instanceToPlain, plainToClass} from 'class-transformer';
import {Repository} from 'typeorm';
import {ProjectPhase} from "./project-phase.entity";
import {ResponseProjectPhaseDto} from "@myideaswork/common/dtos";

@Injectable()
export class ProjectPhaseService {
    constructor(
        @InjectRepository(ProjectPhase)
        private projectPhaseRepository: Repository<ProjectPhase>
    ) {
    }

    async findAll() {
        try {
            return await this.projectPhaseRepository.find();
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async findOne(id: number): Promise<ProjectPhase> {
        try {
            return await this.projectPhaseRepository.findOne({
                where: {id: id},
            });
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async create(projectPhase: ProjectPhase): Promise<ProjectPhase> {
        try {
            return await this.projectPhaseRepository.save(projectPhase);
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async update(id: number, projectPhase: ProjectPhase): Promise<ProjectPhase> {
        try {
            const updatedProjectPhase = await this.projectPhaseRepository.preload({
                id: +id,
                ...projectPhase,
            });
            return await this.projectPhaseRepository.save(updatedProjectPhase);
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await this.projectPhaseRepository.delete(id);
        } catch (e: any) {
            if (e.message) {
                throw new BadRequestException(e.message);
            }
        }
    }

    mapProjectPhasesToResponseDto(projectPhases: ProjectPhase[]): ResponseProjectPhaseDto[] {
        return projectPhases.map((projectPhase: ProjectPhase) => this.mapProjectPhaseToResponseDto(projectPhase));
    }

    mapProjectPhaseToResponseDto(projectPhase: ProjectPhase): ResponseProjectPhaseDto {
        return plainToClass(ResponseProjectPhaseDto, instanceToPlain(projectPhase), {
            excludeExtraneousValues: true,
        });
    }
}

