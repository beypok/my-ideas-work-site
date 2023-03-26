import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignUpFormComponent } from './sign-up-form.component';

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
