import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IntroductionModule} from 'src/introductions/introductions.module';
import {OfferingFilesModule} from 'src/offering-files/offering-files.module';
import {OfferingsController} from './offerings.controller';
import {Offerings} from './offerings.entity';
import {OfferingsService} from './offerings.service';
import {IndustryModule} from "src/industry/industry.module";
import {ProjectPhaseModule} from "../project-phase/project-phase.module";

@Module({
    imports: [TypeOrmModule.forFeature([Offerings]), OfferingFilesModule, IntroductionModule, IndustryModule, ProjectPhaseModule],
    controllers: [OfferingsController],
    providers: [OfferingsService],
})
export class OfferingModule {
}

