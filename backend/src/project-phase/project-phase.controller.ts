import {Controller, Get} from '@nestjs/common'
import {ProjectPhaseService} from "./project-phase.service";
import {ResponseProjectPhaseDto} from '@myideaswork/common/dtos';

@Controller('/project-phase')
export class ProjectPhaseController {
    constructor(
        private readonly projectPhaseService: ProjectPhaseService,
    ) {
    }

    @Get('/all')
    async findAll(): Promise<ResponseProjectPhaseDto[]> {
        const projectPhases = await this.projectPhaseService.findAll();
        return this.projectPhaseService.mapProjectPhasesToResponseDto(projectPhases);
    }
}
