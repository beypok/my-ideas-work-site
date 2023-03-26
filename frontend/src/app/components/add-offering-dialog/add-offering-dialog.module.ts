import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfferingFormModule } from '../offering-form/offering-form.module';
import { AddOfferingDialogComponent } from './add-offering-dialog.component';

@NgModule({
   declarations: [AddOfferingDialogComponent],
   imports: [
      CommonModule,
      OfferingFormModule
   ],
   exports: [AddOfferingDialogComponent],
})
export class AddOfferingDialogModule {}
