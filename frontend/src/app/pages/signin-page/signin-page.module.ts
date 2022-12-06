import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SignInFormModule } from "src/app/components/sign-in-form/sign-in-form.module";
import { SignInPageComponent } from "./signin-page.component";

@NgModule({
  declarations: [SignInPageComponent],
  imports: [CommonModule, SignInFormModule],
  exports: [SignInPageComponent]
})
export class SignInPageModule {
  
}