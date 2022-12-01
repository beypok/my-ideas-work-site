import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SignInPageComponent } from "./signin-page.component";

@NgModule({
  declarations: [SignInPageComponent],
  imports: [CommonModule],
  exports: [SignInPageComponent]
})
export class SignInPageModule {
  
}