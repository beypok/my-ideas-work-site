import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddOfferingDialogComponent } from 'src/app/components/add-offering-dialog/add-offering-dialog.component';
import { getMyOfferings, openAddOfferingDialog } from 'src/app/state/offerings/offerings.actions';

@Component({
   selector: 'my-info-page',
   templateUrl: './my-info-page.component.html',
   styleUrls: ['./my-info-page.component.scss'],
})
export class MyInfoPageComponent {
   constructor(private store: Store) {
      this.store.dispatch(getMyOfferings());
   }

   addOfferingClick() {
      this.store.dispatch(openAddOfferingDialog());
   }
}
