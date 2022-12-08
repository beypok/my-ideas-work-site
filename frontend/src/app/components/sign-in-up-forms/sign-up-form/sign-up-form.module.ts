import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignUpFormComponent } from './sign-up-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
   ],
   exports: [SignUpFormComponent],
})
export class SignUpFormModule {}
