import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOfferingDialogComponent } from 'src/app/components/add-offering-dialog/add-offering-dialog.component';

@Component({
   selector: 'my-info-page',
   templateUrl: './my-info-page.component.html',
   styleUrls: ['./my-info-page.component.scss'],
})
export class MyInfoPageComponent {
   constructor(private dialogService: MatDialog) {}

   addOfferingClick() {
      this.dialogService.open(AddOfferingDialogComponent);
   }
}
