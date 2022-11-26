import { Controller, Get } from '@nestjs/common'
import { OfferingsService } from './offerings.service'

@Controller('/offerings')
export class OfferingsController {
   constructor(private readonly offeringsService: OfferingsService) {}

   @Get()
   accounts(): string {
      return 'Account'
   }
}
