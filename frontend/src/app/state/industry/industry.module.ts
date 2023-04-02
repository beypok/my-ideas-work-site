import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {IndustryService} from "./industry.service";
import {IndustryEffects} from "./industry.effects";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
   imports: [
      EffectsModule.forFeature([IndustryEffects]),
      HttpClientModule,
   ],
   providers: [IndustryService]
})
export class IndustryModule {}

