import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { OfferingFormModule } from '../offering-form/offering-form.module';
import { IntroductionFormComponent } from './introduction-form.component';

@NgModule({
   declarations: [IntroductionFormComponent],
   imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatOptionModule,
      OfferingFormModule,
   ],
   exports: [IntroductionFormComponent],
})
export class IntroductionFormModule {}
