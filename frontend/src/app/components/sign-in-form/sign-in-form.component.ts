import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordValidationService } from './passwordvalidation.service';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions';
import { Observable, Subject, } from 'rxjs';
import { selectSigningUp } from 'src/app/state/authentication';
import {AccountType} from '@myideaswork/common/enums'

@Component({
encapsulation: ViewEncapsulation.None,
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnDestroy {
  form: UntypedFormGroup;

  signingUp$: Observable<boolean>;

  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: UntypedFormBuilder,
    private passwordValidator: PasswordValidationService
  ) {
    this.form = this.fb.group({
         email: new UntypedFormControl('', [Validators.required, Validators.email]),
         password: new UntypedFormControl(
         '',
         Validators.compose([Validators.required, this.passwordValidator.validPassword()])
         ),
         confirmPassword: new UntypedFormControl('', Validators.required),
         accountType: new UntypedFormControl(AccountType.Advertiser, Validators.required),
      },
      {
         validator: this.passwordValidator.matchPassword('password', 'confirmPassword'),
      }
    );

    this.signingUp$ = this.store.select(selectSigningUp);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }


  handleFormButtonClick(): void {
      this.submitForm();
  }

  submitForm() {
    if (this.form.valid) {
      const createUserInfo: any = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        accountType: this.form.get('accountType')?.value,
      };

      let payload: { createUserInfo: any } = {
        createUserInfo,
      };

      this.store.dispatch(AuthenticationActions.signup(payload));
    }
  }
}
