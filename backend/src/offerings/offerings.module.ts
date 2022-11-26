import { Module } from '@nestjs/common'
import { OfferingsService } from './offerings.service'
import { OfferingsController } from './offerings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Offerings } from './offerings.entity'

@Module({
   imports: [TypeOrmModule.forFeature([Offerings])],
   controllers: [OfferingsController],
   providers: [OfferingsService],
})
export class OfferingModule {}
