import {Controller, Get} from '@nestjs/common'
import {IndustryService} from "./industry.service";
import {ResponseIndustryDto} from '@myideaswork/common/dtos';

@Controller('/industry')
export class IndustryController {
    constructor(
        private readonly industryService: IndustryService,
    ) {
    }

    @Get('/all')
    async findAll(): Promise<ResponseIndustryDto[]> {
        const industries = await this.industryService.findAll();
        return this.industryService.mapIndustriesToResponseDto(industries);
    }
}
