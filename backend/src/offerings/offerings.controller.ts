import { CreateOfferingDto, ResponseOfferingDto } from '@myideaswork/common/dtos';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request } from '@nestjs/common/decorators';
import { OfferingsService } from './offerings.service';

@Controller('/offerings')
export class OfferingsController {
   constructor(private readonly offeringsService: OfferingsService) {}

   @Get('/me')
   async offerings(@Request() req): Promise<ResponseOfferingDto[]> {
      const offerings = await this.offeringsService.getMyOfferings(req.user);
      return this.offeringsService.mapOfferingsToResponseDto(offerings);
   }

   @Post()
   async createOfferings(
      @Body() body: CreateOfferingDto,
      @Request() req,
   ): Promise<ResponseOfferingDto> {
      const offering = await this.offeringsService.createOffering(body, req.user);
      return this.offeringsService.mapOfferingToResponseDto(offering);
   }
}

