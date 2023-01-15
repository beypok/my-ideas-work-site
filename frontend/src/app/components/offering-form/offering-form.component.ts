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
   Industries,
   InvestorOfferingType,
   Location,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';
import { Offering, OfferingFile, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnumMapperService } from 'src/app/services/enum-mapper/enum-mapper.service';
import { selectCurrentUser } from 'src/app/state/authentication';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'offering-form',
   templateUrl: './offering-form.component.html',
   styleUrls: ['./offering-form.component.scss'],
   host: {
      class: 'offering-form-wrapper',
   },
})
export class OfferingFormComponent implements OnDestroy, OnChanges {
   @Input('initOffering') initOffering: Offering | null = null;

   @Input('readonly') readonly: boolean = false;

   @Input('showFooterButtons') showFooterButtons: boolean = true;

   @Output() formChange = new EventEmitter<Offering | null>();

   @Output() offeringFilesUpload = new EventEmitter<OfferingFile[]>();

   @Output() submit = new EventEmitter<CreateOfferingDto | UpdateOfferingDto>();

   @Output() cancel = new EventEmitter<void>();

   form: FormGroup | null = null;

   isLoggedInUserAdvertiser = false;

   currentUser: User | null = null;

   get filesToUpload(): OfferingFile[] {
      return (this.initOffering?.offeringFiles ?? []).filter((f) => f.offeringFileId === 0);
   }

   get uploadedFiles(): OfferingFile[] {
      return (this.initOffering?.offeringFiles ?? []).filter((f) => f.offeringFileId !== 0);
   }

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
      if (changes['initOffering']) {
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
         this.submit.emit({ ...this.form?.getRawValue(), filesToUpload: this.filesToUpload });
      }
   }

   onCancel() {
      this.cancel.emit();
   }

   private buildForm() {
      this.form = this.fb.group({
         name: new FormControl(this.initOffering?.name ?? '', Validators.required),
         investorOfferingType: new FormControl(this.initOffering?.investorOfferingType ?? null),
         industry: new FormControl(this.initOffering?.industry ?? null),
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
         offeringFiles: new FormControl(
            (this.initOffering?.offeringFiles ?? []).filter((f) => f.offeringFileId !== 0),
         ),
      });

      if (this.initOffering?.user?.accountType === AccountType.Advertiser) {
         if (!this.initOffering?.industry)
            this.form?.get('industry')?.setValue(Industries['Advertising (AdTech)']);
      } else if (this.initOffering?.user?.accountType === AccountType.Investor) {
         if (!this.initOffering?.investorOfferingType)
            this.form?.get('investorOfferingType')?.setValue(InvestorOfferingType.Investor);
      }

      this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((v) => {
         this.formChange.emit(v);
      });
   }

   selectFile(event: any) {
      const files = event.target.files;
      const filesToUpload = Array.from(files).map((f: any) => {
         return {
            name: f.name,
            url: '',
            offeringFileId: 0,
            offeringId: this.initOffering?.offeringId,
            file: f,
         };
      });
      const formValues = this.form?.getRawValue() ?? {};
      this.formChange.emit({
         ...formValues,
         offeringFiles: [...formValues.offeringFiles, ...filesToUpload],
      });
   }
}
