import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Collateral, Location, OfferingType, ProjectPhase, Terms } from '@myideaswork/common/enums';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'add-offering-dialog',
   templateUrl: './add-offering-dialog.component.html',
   styleUrls: ['./add-offering-dialog.component.scss'],
})
export class AddOfferingDialogComponent implements OnDestroy {
   form: FormGroup;

   _offeringType = OfferingType;

   isLoggedInUserAdvertiser = false;

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
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSubmit(e: SubmitEvent) {
      e.preventDefault();

      console.log(this.form.getRawValue());
   }
}
