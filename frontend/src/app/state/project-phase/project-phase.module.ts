import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {ProjectPhaseService} from "./project-phase.service";
import {ProjectPhaseEffects} from "./project-phase.effects";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
   imports: [
      EffectsModule.forFeature([ProjectPhaseEffects]),
      HttpClientModule,
   ],
   providers: [ProjectPhaseService]
})
export class ProjectPhaseModule {}

