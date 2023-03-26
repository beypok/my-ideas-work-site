import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StaxFormModule } from '../stax-form/stax-form.module';
import { PurchaseIntroductionsDialogComponent } from './purchase-introductions-dialog.component';

@NgModule({
   declarations: [PurchaseIntroductionsDialogComponent],
   imports: [CommonModule, MatButtonModule, StaxFormModule],
   exports: [PurchaseIntroductionsDialogComponent],
})
export class PurchaseIntroductionsDialogModule {}
