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

   @Input('primaryFooterButton') primaryFooterButton: string | null = null;

   @Input('cancelFooterButton') cancelFooterButton: string | null = null;

   @Output() formChange = new EventEmitter<Introduction>();

   @Output() approve = new EventEmitter<void>();

   @Output() submit = new EventEmitter<Introduction>();

   @Output() deny = new EventEmitter<void>();

   @Output() cancel = new EventEmitter<void>();

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
         if (this.readonly) {
            this.approve.emit();
         } else {
            this.submit.emit(this.form?.getRawValue());
         }
      }
   }

   onSecondary() {
      if (this.readonly) {
         this.deny.emit();
      } else {
         this.cancel.emit();
      }
   }

   private buildForm() {
      this.form = this.fb.group({
         contactEmail: new FormControl(
            this.initIntroduction?.contactEmail ?? '',
            Validators.required,
         ),
         message: new FormControl(this.initIntroduction?.message ?? '', Validators.required),
      });
      this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((v) => {
         this.formChange.emit(v);
      });
   }
}
