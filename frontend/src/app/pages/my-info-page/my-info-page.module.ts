import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyInfoPageComponent } from './my-info-page.component';
import { MatIconModule } from '@angular/material/icon';
import { AddOfferingDialogModule } from 'src/app/components/add-offering-dialog/add-offering-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
   declarations: [MyInfoPageComponent],
   imports: [CommonModule, MatIconModule, MatDialogModule, AddOfferingDialogModule],
   exports: [MyInfoPageComponent],
})
export class MyInfoPageModule {}