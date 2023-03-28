import {  Controller, Delete, Get, NotFoundException, Param, Post, Query, Request, Put } from '@nestjs/common'
import { DeleteResult } from 'typeorm';
import {IndustryService} from "./industry.service";
import {Role} from "../authentication/roles/roles.decorator";
import { ResponseIndustryDto } from '@myideaswork/common/dtos';
import {AuthRole} from "@myideaswork/common/enums";

@Controller('industry')
export class IndustryController {
   constructor(
      private readonly industryService: IndustryService,
   ) {}

   @Get()
  async findByIds(@Query('ids') idsString: string): Promise<ResponseIndustryDto[]> {
    const ids = idsString.split(',').map((id) => parseInt(id));
    const industries = await this.industryService.findByIds(ids);

    if (industries.length < ids.length) {
      const notFoundIds = [];
      ids.forEach((id) => {
        if (!industries.some((industry) => industry.id === id)) {
          notFoundIds.push(id);
        }
      });
      throw new NotFoundException(`Could not find industries with the ids: ${notFoundIds}`);
    }

    return this.industryService.mapIndustriesToResponseDto(industries);
  }

  @Role(AuthRole.Public)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ResponseIndustryDto> {
    const industry = await this.industryService.findById(id);
    if (industry) return this.industryService.mapIndustryToResponseDto(industry);

    throw new NotFoundException();
  }

  @Delete('me')
  async deleteById(@Request() req): Promise<DeleteResult> {
    const id = req.industry.id;
    return await this.industryService.deleteById(id);
  }
}
