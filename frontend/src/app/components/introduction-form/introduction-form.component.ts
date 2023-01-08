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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Introduction, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnumMapperService } from 'src/app/services/enum-mapper/enum-mapper.service';
import { selectCurrentUser } from 'src/app/state/authentication';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'introduction-form',
   templateUrl: './introduction-form.component.html',
   styleUrls: ['./introduction-form.component.scss'],
   host: {
      class: 'introduction-form-wrapper',
   },
})
export class IntroductionFormComponent implements OnDestroy, OnChanges {
   @Input('initIntroduction') initIntroduction: Introduction | null = null;

   @Input('readonly') readonly: boolean = false;

   @Input('showFooterButtons') showFooterButtons: boolean = true;

   @Output() formChange = new EventEmitter<Introduction>();

   @Output() approve = new EventEmitter<void>();

   @Output() deny = new EventEmitter<void>();

   form: FormGroup | null = null;

   isLoggedInUserAdvertiser = false;

   currentUser: User | null = null;

   private currentUser$: Observable<User | null>;

   private destroyed$ = new Subject<void>();

   constructor(
      private store: Store,
      private fb: FormBuilder,
      public enumMapper: EnumMapperService,
   ) {
      this.buildForm();

      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
         this.currentUser = user;
      });
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['initIntroduction']) {
         this.buildForm();
      }
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSubmit(e: SubmitEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (this.form?.valid) {
         this.approve.emit(this.form?.getRawValue());
      }
   }

   onDeny() {
      this.deny.emit();
   }

   private buildForm() {
      this.form = this.fb.group({
         // name: new FormControl(this.initIntroduction?.name ?? '', Validators.required),
         // offeringType: new FormControl(
         //    this.initIntroduction?.offeringType ?? IntroductionType.Business,
         //    Validators.required,
         // ),
         // description: new FormControl(
         //    this.initIntroduction?.description ?? null,
         //    Validators.required,
         // ),
         // location: new FormControl(
         //    this.initIntroduction?.location ?? Location['United States'],
         //    Validators.required,
         // ),
         // projectPhase: new FormControl(
         //    this.initIntroduction?.projectPhase ?? ProjectPhase.Acquisition,
         //    Validators.required,
         // ),
         // collateral: new FormControl(
         //    this.initIntroduction?.collateral ?? Collateral.Bond,
         //    Validators.required,
         // ),
         // terms: new FormControl(
         //    this.initIntroduction?.terms ?? Terms.LineOfCredit,
         //    Validators.required,
         // ),
         // contactEmail: new FormControl(this.initIntroduction?.contactEmail ?? '', [
         //    Validators.required,
         //    Validators.email,
         // ]),
         // amountRangeStart: new FormControl(
         //    this.initIntroduction?.amountRangeStart ?? 0,
         //    Validators.required,
         // ),
         // amountRangeEnd: new FormControl(
         //    this.initIntroduction?.amountRangeEnd ?? 10000,
         //    Validators.required,
         // ),
         // amountRequested: new FormControl(
         //    this.initIntroduction?.amountRequested ?? 10000,
         //    Validators.required,
         // ),
      });
      this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((v) => {
         this.formChange.emit(v);
      });
   }
}
