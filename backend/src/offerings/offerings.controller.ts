import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   ResponseOfferingDto,
} from '@myideaswork/common/dtos';
import { AuthRole } from '@myideaswork/common/enums';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Put, Request } from '@nestjs/common/decorators';
import { Role } from 'src/authentication/roles/roles.decorator';
import { OfferingsService } from './offerings.service';

@Controller('/offerings')
export class OfferingsController {
   constructor(private readonly offeringsService: OfferingsService) {}

   @Get('/approved')
   @Role(AuthRole.Public)
   async allApprovedOfferings(): Promise<ResponseOfferingDto[]> {
      const offerings = await this.offeringsService.getApprovedOfferings();
      return this.offeringsService.mapOfferingsToResponseDto(offerings);
   }

   @Get('/approved/:id')
   @Role(AuthRole.Public)
   async approvedOffering(@Param('id') id: number): Promise<ResponseOfferingDto> {
      const offering = await this.offeringsService.getApprovedOffering(id);
      return this.offeringsService.mapOfferingToResponseDto(offering);
   }

   @Get('/me')
   async offerings(@Request() req): Promise<ResponseOfferingDto[]> {
      const offerings = await this.offeringsService.getMyOfferings(req.user);
      return this.offeringsService.mapOfferingsToResponseDto(offerings);
   }

   @Get('/all')
   @Role(AuthRole.Founder)
   async allOfferings(@Request() req): Promise<ResponseOfferingDto[]> {
      const offerings = await this.offeringsService.getAllOfferings();
      return this.offeringsService.mapOfferingsToResponseDto(offerings);
   }

   @Put('/:id/approve')
   @Role(AuthRole.Founder)
   async approveOffering(@Request() req, @Param('id') offeringId): Promise<ResponseOfferingDto> {
      const offering = await this.offeringsService.approveOffering(offeringId);
      return this.offeringsService.mapOfferingToResponseDto(offering);
   }

   @Put('/:id/deny')
   @Role(AuthRole.Founder)
   async denyOffering(@Request() req, @Param('id') offeringId): Promise<ResponseOfferingDto> {
      const offering = await this.offeringsService.denyOffering(offeringId);
      return this.offeringsService.mapOfferingToResponseDto(offering);
   }

   @Post()
   async createOfferings(
      @Body() body: CreateOfferingDto,
      @Request() req,
   ): Promise<ResponseOfferingDto> {
      const offering = await this.offeringsService.createOffering(body, req.user);
      return this.offeringsService.mapOfferingToResponseDto(offering);
   }

   @Post('/batchSave')
   async batchSaveOfferings(
      @Body() body: BatchSaveOfferingsDto,
      @Request() req,
   ): Promise<ResponseOfferingDto[]> {
      const offering = await this.offeringsService.batchSaveOffering(body, req.user);
      return this.offeringsService.mapOfferingsToResponseDto(offering);
   }
}

