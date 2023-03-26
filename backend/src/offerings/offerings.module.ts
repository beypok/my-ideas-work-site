import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntroductionModule } from 'src/introductions/introductions.module';
import { OfferingFilesModule } from 'src/offering-files/offering-files.module';
import { OfferingsController } from './offerings.controller';
import { Offerings } from './offerings.entity';
import { OfferingsService } from './offerings.service';

@Module({
   imports: [TypeOrmModule.forFeature([Offerings]), OfferingFilesModule, IntroductionModule],
   controllers: [OfferingsController],
   providers: [OfferingsService],
})
export class OfferingModule {}

