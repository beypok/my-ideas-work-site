import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
   UntypedFormBuilder,
   UntypedFormControl,
   UntypedFormGroup,
   Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { selectLoggingIn, selectLoginFail } from 'src/app/state/authentication';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions';
import { PasswordValidationService } from '../passwordvalidation.service';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'sign-in-form',
   templateUrl: './sign-in-form.component.html',
   styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnDestroy {
   form: UntypedFormGroup;

   signingIn$: Observable<boolean>;

   signInFailure$: Observable<boolean>;

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
         },
         {
            validator: this.passwordValidator.matchPassword('password', 'confirmPassword'),
         },
      );

      this.signingIn$ = this.store.select(selectLoggingIn);
      this.signInFailure$ = this.store.select(selectLoginFail);
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   handleFormButtonClick(): void {
      this.submitForm();
   }

   submitForm() {
      if (this.form.valid) {
         this.store.dispatch(
            AuthenticationActions.login({
               email: this.form.get('email')?.value,
               password: this.form.get('password')?.value,
            }),
         );
      }
   }

   handleSignUp(): void {
      let url = '/signup';
      const redirect_uri = this.route.snapshot.queryParams['redirect_uri'];
      if (redirect_uri) url += `?redirect_uri=${redirect_uri}`;
      this.router.navigateByUrl(url);
   }
}
