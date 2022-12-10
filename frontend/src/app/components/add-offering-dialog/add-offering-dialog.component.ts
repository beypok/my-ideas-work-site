import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOfferingDto } from '@myideaswork/common/dtos';
import {
   AccountType,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';
import { User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/authentication';
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
export class AddOfferingDialogComponent implements OnDestroy {
   form: FormGroup;

   _offeringType = OfferingType;

   _accountType = AccountType;

   isLoggedInUserAdvertiser = false;

   currentUser: User | null = null;

   private currentUser$: Observable<User>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private fb: FormBuilder) {
      this.form = this.fb.group({
         name: new FormControl('', Validators.required),
         offeringType: new FormControl(OfferingType.Business, Validators.required),
         description: new FormControl(null, Validators.required),
         location: new FormControl(Location.UnitedStates, Validators.required),
         projectPhase: new FormControl(ProjectPhase.Acquisition, Validators.required),
         collateral: new FormControl(Collateral.Bond, Validators.required),
         terms: new FormControl(Terms.LineOfCredit, Validators.required),
         contactEmail: new FormControl('', Validators.required),
         amountRangeStart: new FormControl(0, Validators.required),
         amountRangeEnd: new FormControl(10000, Validators.required),
         amountRequested: new FormControl(10000, Validators.required),
      });

      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
         this.currentUser = user;
         if (this.currentUser.accountType === AccountType.Advertiser) {
            this.form.get('offeringType')?.setValue(OfferingType.Business);
         } else {
            this.form.get('offeringType')?.setValue(OfferingType.Investor);
         }
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSubmit(e: SubmitEvent) {
      e.preventDefault();

      const createOfferingDto: CreateOfferingDto = {
         name: this.form.get('name')?.value,
         offeringType: this.form.get('offeringType')?.value,
         description: this.form.get('description')?.value,
         location: this.form.get('location')?.value,
         projectPhase: this.form.get('projectPhase')?.value,
         collateral: this.form.get('collateral')?.value,
         terms: this.form.get('terms')?.value,
         contactEmail: this.form.get('contactEmail')?.value,
         amountRangeStart: this.form.get('amountRangeStart')?.value,
         amountRangeEnd: this.form.get('amountRangeEnd')?.value,
         amountRequested: this.form.get('amountRequested')?.value,
      };
      this.store.dispatch(addOfferingToCreate({ offering: createOfferingDto }));
   }

   onCancel() {
      this.store.dispatch(closeAddOfferingDialog());
   }
}
