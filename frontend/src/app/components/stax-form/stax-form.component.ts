import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentMethod } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { loadCustomerPaymentMethods, selectPaymentMethods } from 'src/app/state/authentication';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'stax-form',
   templateUrl: './stax-form.component.html',
   styleUrls: ['./stax-form.component.scss'],
   host: {
      class: 'stax-form',
   },
})
export class StaxFormComponent implements OnDestroy {
   form: FormGroup;

   paymentMethods: PaymentMethod[] = [];

   private destroyed$ = new Subject<void>();

   constructor(private fb: FormBuilder, private store: Store) {
      this.store.dispatch(loadCustomerPaymentMethods());
      this.store
         .select(selectPaymentMethods)
         .pipe(takeUntil(this.destroyed$))
         .subscribe((paymentMethods) => {
            this.paymentMethods = [...paymentMethods];
         });
      this.form = this.fb.group({
         firstName: new FormControl('', Validators.required),
         lastName: new FormControl('', Validators.required),
         phone: new FormControl('', [
            Validators.required,
            Validators.pattern(
               '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$',
            ),
         ]),
         card: new FormControl('', [
            Validators.required,
            Validators.pattern(
               '^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35d{3})d{11})',
            ),
         ]),
         cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]),
         expirationMonth: new FormControl(new Date().getMonth() + 1, Validators.required),
         expirationYear: new FormControl(new Date().getFullYear(), Validators.required),
         paymentMethodId: new FormControl(null),
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }
}
