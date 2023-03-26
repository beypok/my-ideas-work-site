import { CreateUserDto } from '@myideaswork/common/dtos';
import { PaymentMethod, User } from '@myideaswork/common/interfaces';
import { createAction, props } from '@ngrx/store';

export const reAuthenticate = createAction('[Authentication] reAuthenticate');
export const reAuthenticateSuccess = createAction(
   '[Authentication] reAuthenticate success',
   props<{ user: User; access_token: string }>(),
);
export const reAuthenticateFailure = createAction(
   '[Authentication] reAuthenticate failure',
   props<{ error: Error }>(),
);

export const signout = createAction('[Authentication] signout');

export const login = createAction(
   '[Authentication] login',
   props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
   '[Authentication] login success',
   props<{ user: User; access_token: string }>(),
);
export const loginFailure = createAction(
   '[Authentication] login failure',
   props<{ error: Error }>(),
);

export const signup = createAction(
   '[Authentication] signup',
   props<{ createUserInfo: CreateUserDto }>(),
);
export const signupSuccess = createAction(
   '[Authentication] signup success',
   props<{ user: User; access_token: string }>(),
);
export const signupFailure = createAction(
   '[Authentication] signup failure',
   props<{ error: Error }>(),
);

export const loadCustomerPaymentMethods = createAction(
   '[Authentication] load customer payment methods',
);
export const loadCustomerPaymentMethodsSuccess = createAction(
   '[Authentication] load customer payment methods success',
   props<{ paymentMethods: PaymentMethod[] }>(),
);
export const loadCustomerPaymentMethodsFailure = createAction(
   '[Authentication] load customer payment methods failure',
   props<{ error: Error }>(),
);
