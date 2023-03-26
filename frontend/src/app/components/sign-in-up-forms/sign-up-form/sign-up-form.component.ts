import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
   UntypedFormBuilder,
   UntypedFormControl,
   UntypedFormGroup,
   Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserDto } from '@myideaswork/common/dtos';
import { AccountType } from '@myideaswork/common/enums';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { selectAuthErrors, selectSigningUp } from 'src/app/state/authentication';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions';
import { PasswordValidationService } from '../passwordvalidation.service';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'sign-up-form',
   templateUrl: './sign-up-form.component.html',
   styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnDestroy {
   form: UntypedFormGroup;

   signingUp$: Observable<boolean>;

   error$: Observable<Error | null>;

   _accountType = AccountType;

   private destroyed$ = new Subject<void>();

   constructor(
      private store: Store,
      private fb: UntypedFormBuilder,
      private passwordValidator: PasswordValidationService,
      private router: Router,
      private route: ActivatedRoute,
   ) {
      this.form = this.fb.group(
         {
            email: new UntypedFormControl('', [Validators.required, Validators.email]),
            password: new UntypedFormControl(
               '',
               Validators.compose([Validators.required, this.passwordValidator.validPassword()]),
            ),
            confirmPassword: new UntypedFormControl('', Validators.required),
            accountType: new UntypedFormControl(AccountType.Advertiser, Validators.required),
         },
         {
            validator: this.passwordValidator.matchPassword('password', 'confirmPassword'),
         },
      );

      this.signingUp$ = this.store.select(selectSigningUp);
      this.error$ = this.store.select(selectAuthErrors);
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   handleFormButtonClick(): void {
      this.submitForm();
   }

   submitForm() {
      if (this.form.valid) {
         const createUserInfo: CreateUserDto = {
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value,
            accountType: this.form.get('accountType')?.value,
         };

         let payload: { createUserInfo: CreateUserDto } = {
            createUserInfo,
         };

         this.store.dispatch(AuthenticationActions.signup(payload));
      }
   }

   handleSignIn(): void {
      let url = '/signin';
      const redirect_uri = this.route.snapshot.queryParams['redirect_uri'];
      if (redirect_uri) url += `?redirect_uri=${redirect_uri}`;
      this.router.navigateByUrl(url);
   }
}
