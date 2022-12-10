import {
   Component,
   EventEmitter,
   Input,
   OnChanges,
   OnDestroy,
   Output,
   SimpleChanges,
   ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOfferingDto, UpdateOfferingDto } from '@myideaswork/common/dtos';
import {
   AccountType,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';
import { Offering, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/authentication';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'offering-form',
   templateUrl: './offering-form.component.html',
   styleUrls: ['./offering-form.component.scss'],
})
export class OfferingFormComponent implements OnDestroy, OnChanges {
   @Input('initOffering') initOffering: Offering | null = null;

   @Input('showFooterButtons') showFooterButtons: boolean = true;

   @Output() formChange = new EventEmitter<Offering>();

   @Output() submit = new EventEmitter<CreateOfferingDto | UpdateOfferingDto>();

   @Output() cancel = new EventEmitter<void>();

   form: FormGroup | null = null;

   // Enums
   _accountType = AccountType;
   _offeringType = OfferingType;
   _locations = Location;
   _locationKeys = Object.keys(Location);
   _projectPhases = ProjectPhase;
   _projectPhaseKeys = Object.keys(ProjectPhase);
   _terms = Terms;
   _termsKeys = Object.keys(Terms);
   _collateral = Collateral;
   _collateralKeys = Object.keys(Collateral);

   isLoggedInUserAdvertiser = false;

   currentUser: User | null = null;

   private currentUser$: Observable<User>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private fb: FormBuilder) {
      this.buildForm();

      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
         this.currentUser = user;
         if (this.currentUser.accountType === AccountType.Advertiser) {
            if (!this.initOffering) this.form?.get('offeringType')?.setValue(OfferingType.Business);
         } else {
            if (!this.initOffering) this.form?.get('offeringType')?.setValue(OfferingType.Investor);
         }
      });
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['initOffering']) {
         this.buildForm();
      }
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSubmit(e: SubmitEvent) {
      e.preventDefault();
      this.submit.emit(this.form?.getRawValue());
   }

   onCancel() {
      this.cancel.emit();
   }

   // Enum mapping methods
   mapEnumKeyToValue(key: string, e: Object) {
      return e[key as keyof typeof e];
   }

   private buildForm() {
      this.form = this.fb.group({
         name: new FormControl(this.initOffering?.name ?? '', Validators.required),
         offeringType: new FormControl(
            this.initOffering?.offeringType ?? OfferingType.Business,
            Validators.required,
         ),
         description: new FormControl(this.initOffering?.description ?? null, Validators.required),
         location: new FormControl(
            this.initOffering?.location ?? Location['United States'],
            Validators.required,
         ),
         projectPhase: new FormControl(
            this.initOffering?.projectPhase ?? ProjectPhase.Acquisition,
            Validators.required,
         ),
         collateral: new FormControl(
            this.initOffering?.collateral ?? Collateral.Bond,
            Validators.required,
         ),
         terms: new FormControl(
            this.initOffering?.terms ?? Terms.LineOfCredit,
            Validators.required,
         ),
         contactEmail: new FormControl(this.initOffering?.contactEmail ?? '', [
            Validators.required,
            Validators.email,
         ]),
         amountRangeStart: new FormControl(
            this.initOffering?.amountRangeStart ?? 0,
            Validators.required,
         ),
         amountRangeEnd: new FormControl(
            this.initOffering?.amountRangeEnd ?? 10000,
            Validators.required,
         ),
         amountRequested: new FormControl(
            this.initOffering?.amountRequested ?? 10000,
            Validators.required,
         ),
      });

      this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((v) => {
         this.formChange.emit(v);
      });
   }
}
