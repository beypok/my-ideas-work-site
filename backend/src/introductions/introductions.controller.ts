import { CreateIntroductionDto, ResponseIntroductionDto } from '@myideaswork/common/dtos';
import { AuthRole } from '@myideaswork/common/enums';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Put, Request } from '@nestjs/common/decorators';
import { Role } from 'src/authentication/roles/roles.decorator';
import { IntroductionsService } from './introductions.service';

@Controller('/introductions')
export class IntroductionsController {
   constructor(private readonly introductionsService: IntroductionsService) {}

   @Get('/me')
   async introductions(@Request() req): Promise<ResponseIntroductionDto[]> {
      const introductions = await this.introductionsService.getMyIntroductions(req.user);
      return this.introductionsService.mapIntroductionsToResponseDto(introductions);
   }

   @Get('/all')
   @Role(AuthRole.Founder)
   async allintroductions(@Request() req): Promise<ResponseIntroductionDto[]> {
      const introductions = await this.introductionsService.getAllIntroductions();
      return this.introductionsService.mapIntroductionsToResponseDto(introductions);
   }

   @Put('/:id/approve')
   @Role(AuthRole.Founder)
   async approveintroduction(
      @Request() req,
      @Param('id') introductionId,
   ): Promise<ResponseIntroductionDto> {
      const introduction = await this.introductionsService.approveIntroduction(introductionId);
      return this.introductionsService.mapIntroductionToResponseDto(introduction);
   }

   @Put('/:id/deny')
   @Role(AuthRole.Founder)
   async denyintroduction(
      @Request() req,
      @Param('id') introductionId,
   ): Promise<ResponseIntroductionDto> {
      const introduction = await this.introductionsService.denyIntroduction(introductionId);
      return this.introductionsService.mapIntroductionToResponseDto(introduction);
   }

   @Post()
   async createIntroductions(
      @Body() body: CreateIntroductionDto,
      @Request() req,
   ): Promise<ResponseIntroductionDto> {
      const introduction = await this.introductionsService.createIntroduction(body, req.user);
      return this.introductionsService.mapIntroductionToResponseDto(introduction);
   }
}

