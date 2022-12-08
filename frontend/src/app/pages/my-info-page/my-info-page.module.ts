import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyInfoPageComponent } from './my-info-page.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
   declarations: [MyInfoPageComponent],
   imports: [CommonModule, MatIconModule],
   exports: [MyInfoPageComponent],
})
export class MyInfoPageModule {}
