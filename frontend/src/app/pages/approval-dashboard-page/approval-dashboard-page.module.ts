import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddOfferingDialogModule } from 'src/app/components/add-offering-dialog/add-offering-dialog.module';
import { OfferingFormModule } from 'src/app/components/offering-form/offering-form.module';
import { ApprovalDashboardPageComponent } from './approval-dashboard-page.component';

@NgModule({
   declarations: [ApprovalDashboardPageComponent],
   imports: [
      CommonModule,
      MatIconModule,
      MatDialogModule,
      MatButtonModule,
      AddOfferingDialogModule,
      OfferingFormModule,
   ],
   exports: [ApprovalDashboardPageComponent],
})
export class ApprovalDashboardPageModule {}
