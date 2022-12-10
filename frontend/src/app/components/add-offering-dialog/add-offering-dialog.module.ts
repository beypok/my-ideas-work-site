import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { OfferingsModule } from 'src/app/state/offerings/offerings.module';
import { AddOfferingDialogComponent } from './add-offering-dialog.component';

@NgModule({
   declarations: [AddOfferingDialogComponent],
   imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatOptionModule,
      OfferingsModule,
   ],
   exports: [AddOfferingDialogComponent],
})
export class AddOfferingDialogModule {}
