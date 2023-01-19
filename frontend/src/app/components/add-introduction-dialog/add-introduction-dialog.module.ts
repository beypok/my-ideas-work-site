import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IntroductionFormModule } from '../introduction-form/introduction-form.module';
import { AddIntroductionDialogComponent } from './add-introduction-dialog.component';

@NgModule({
   declarations: [AddIntroductionDialogComponent],
   imports: [CommonModule, IntroductionFormModule, MatButtonModule],
   exports: [AddIntroductionDialogComponent],
})
export class AddIntroductionDialogModule {}
