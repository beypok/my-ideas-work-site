import { Component, ViewEncapsulation } from '@angular/core';
import { CreateOfferingDto, UpdateOfferingDto } from '@myideaswork/common/dtos';
import { Store } from '@ngrx/store';
import {
   addOfferingToCreate,
   closeAddOfferingDialog,
} from 'src/app/state/offerings/offerings.actions';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'add-offering-dialog',
   templateUrl: './add-offering-dialog.component.html',
   styleUrls: ['./add-offering-dialog.component.scss'],
})
export class AddOfferingDialogComponent {
   constructor(private store: Store) {}

   onSubmit(offering: CreateOfferingDto | UpdateOfferingDto) {
      this.store.dispatch(addOfferingToCreate({ offering }));
   }
   onCancel() {
      this.store.dispatch(closeAddOfferingDialog());
   }
}
