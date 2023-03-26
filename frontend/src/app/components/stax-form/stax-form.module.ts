import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { StaxFormComponent } from './stax-form.component';

@NgModule({
   declarations: [StaxFormComponent],
   imports: [
      CommonModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      AuthenticationModule,
      MatRadioModule,
   ],
   exports: [StaxFormComponent],
})
export class StaxFormModule {}
