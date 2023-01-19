import { Component, Inject, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offering, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
   closePurchaseIntroductionsDialog,
   purchaseIntroductions,
} from 'src/app/state/introductions/introductions.actions';
import { selectCurrentUser } from '../../state/authentication/authentication.selector';
import { StaxFormComponent } from '../stax-form/stax-form.component';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'purchase-introductions-dialog',
   templateUrl: './purchase-introductions-dialog.component.html',
   styleUrls: ['./purchase-introductions-dialog.component.scss'],
})
export class PurchaseIntroductionsDialogComponent implements OnDestroy {
   @ViewChild('staxFormCmp') staxFormCmp: StaxFormComponent | null = null;

   currentUser: User | null = null;

   private destroyed$ = new Subject<void>();

   constructor(@Inject(MAT_DIALOG_DATA) public data: { offering: Offering }, private store: Store) {
      this.store
         .select(selectCurrentUser)
         .pipe(takeUntil(this.destroyed$))
         .subscribe((currentUser) => {
            this.currentUser = currentUser;
         });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSubmit() {
      const form = this.staxFormCmp?.form;
      console.log(form);
      if (form?.valid || form?.get('paymentMethodId')?.value) {
         const values = form?.getRawValue();
         this.store.dispatch(
            purchaseIntroductions({
               paymentCredentials: {
                  ...values,
                  expirationMonth:
                     (+values.expirationMonth < 10 ? '0' : '') + values.expirationMonth,
                  expirationYear: `${values.expirationYear}`.slice(-2),
               },
            }),
         );
      }
   }

   onCancel() {
      this.store.dispatch(closePurchaseIntroductionsDialog());
   }
}
