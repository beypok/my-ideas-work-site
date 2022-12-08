import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignUpFormComponent } from './sign-up-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
   declarations: [SignUpFormComponent],
   imports: [
      CommonModule,
      AuthenticationModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatOptionModule,
      MatSelectModule,
      MatProgressSpinnerModule,
   ],
   exports: [SignUpFormComponent],
})
export class SignUpFormModule {}
