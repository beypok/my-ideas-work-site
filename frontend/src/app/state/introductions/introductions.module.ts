import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IntroductionEffects } from './introductions.effects';
import { IntroductionService } from './introductions.service';

@NgModule({
   imports: [EffectsModule.forFeature([IntroductionEffects]), HttpClientModule],
   providers: [IntroductionService],
})
export class IntroductionsModule {}

