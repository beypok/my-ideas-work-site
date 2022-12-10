import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddOfferingDialogModule } from 'src/app/components/add-offering-dialog/add-offering-dialog.module';
import { OfferingFormModule } from 'src/app/components/offering-form/offering-form.module';
import { MyInfoPageComponent } from './my-info-page.component';

@NgModule({
   declarations: [MyInfoPageComponent],
   imports: [
      CommonModule,
      MatIconModule,
      MatDialogModule,
      MatButtonModule,
      AddOfferingDialogModule,
      OfferingFormModule,
   ],
   exports: [MyInfoPageComponent],
})
export class MyInfoPageModule {}
