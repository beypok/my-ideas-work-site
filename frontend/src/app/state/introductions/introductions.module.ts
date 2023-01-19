import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AddIntroductionDialogModule } from 'src/app/components/add-introduction-dialog/add-introduction-dialog.module';
import { PurchaseIntroductionsDialogModule } from 'src/app/components/purchase-introductions-dialog/purchase-introductions-dialog.module';
import { IntroductionEffects } from './introductions.effects';
import { IntroductionService } from './introductions.service';

@NgModule({
   imports: [
      EffectsModule.forFeature([IntroductionEffects]),
      HttpClientModule,
      PurchaseIntroductionsDialogModule,
      AddIntroductionDialogModule,
   ],
   providers: [IntroductionService],
})
export class IntroductionsModule {}

