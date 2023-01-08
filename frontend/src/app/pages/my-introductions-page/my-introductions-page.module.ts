import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddOfferingDialogModule } from 'src/app/components/add-offering-dialog/add-offering-dialog.module';
import { IntroductionFormModule } from 'src/app/components/introduction-form/introduction-form.module';
import { IntroductionsModule } from 'src/app/state/introductions/introductions.module';
import { MyIntroductionsPageComponent } from './my-introductions-page.component';

@NgModule({
   declarations: [MyIntroductionsPageComponent],
   imports: [
      CommonModule,
      MatIconModule,
      MatDialogModule,
      MatButtonModule,
      AddOfferingDialogModule,
      IntroductionsModule,
      IntroductionFormModule,
   ],
   exports: [MyIntroductionsPageComponent],
})
export class MyIntroductionsPageModule {}
