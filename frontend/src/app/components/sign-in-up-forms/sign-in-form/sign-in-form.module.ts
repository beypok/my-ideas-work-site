import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignInFormComponent } from './sign-in-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
   declarations: [SignInFormComponent],
   imports: [
      CommonModule,
      AuthenticationModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatProgressSpinnerModule,
   ],
   exports: [SignInFormComponent],
})
export class SignInFormModule {}
