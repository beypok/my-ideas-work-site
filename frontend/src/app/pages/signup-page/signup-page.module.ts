import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignUpFormModule } from 'src/app/components/sign-in-up-forms/sign-up-form/sign-up-form.module';
import { SignUpPageComponent } from './signup-page.component';

@NgModule({
   declarations: [SignUpPageComponent],
   imports: [CommonModule, SignUpFormModule],
   exports: [SignUpPageComponent],
})
export class SignUpPageModule {}
