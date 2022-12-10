import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { OfferingEffects } from './offerings.effects';
import { HttpClientModule } from '@angular/common/http';
import { OfferingService } from './offerings.service';

@NgModule({
   imports: [EffectsModule.forFeature([OfferingEffects]), HttpClientModule],
   providers: [OfferingService],
})
export class OfferingsModule {}

