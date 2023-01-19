import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountType } from '@myideaswork/common/enums';
import { Introduction, Offering, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
   closeAddIntroductionDialog,
   createIntroduction,
   openPurchaseIntroductionsDialog,
} from 'src/app/state/introductions/introductions.actions';
import { selectCurrentUser } from '../../state/authentication/authentication.selector';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'add-introduction-dialog',
   templateUrl: './add-introduction-dialog.component.html',
   styleUrls: ['./add-introduction-dialog.component.scss'],
})
export class AddIntroductionDialogComponent implements OnDestroy {
   currentUser: User | null = null;

   get canRequestIntroduction(): boolean {
      return !(
         !this.currentUser ||
         ((this.currentUser?.purchasedIntroductions ?? 0) <= 0 &&
            this.currentUser?.accountType !== AccountType.Investor)
      );
   }

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

   onSubmit(introduction: Introduction) {
      if (this.canRequestIntroduction) {
         this.store.dispatch(
            createIntroduction({
               introduction: {
                  contactEmail: introduction.contactEmail ?? '',
                  message: introduction.contactEmail ?? '',
                  createUserId: this.currentUser?.id ?? 0,
                  receiveUserId: this.data.offering.user?.id ?? 0,
                  offeringId: this.data.offering.offeringId ?? 0,
               },
            }),
         );
      }
   }

   onCancel() {
      this.store.dispatch(closeAddIntroductionDialog());
   }

   purchaseIntroductions() {
      this.store.dispatch(openPurchaseIntroductionsDialog());
   }
}
