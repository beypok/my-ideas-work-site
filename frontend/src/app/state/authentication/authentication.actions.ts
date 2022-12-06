import { createAction, props } from '@ngrx/store';

export const reAuthenticate = createAction('[Authentication] reAuthenticate');
export const reAuthenticateSuccess = createAction(
  '[Authentication] reAuthenticate success',
  props<{ user: any; access_token: string }>()
);
export const reAuthenticateFailure = createAction(
  '[Authentication] reAuthenticate failure',
  props<{ error: Error }>()
);

export const signout = createAction('[Authentication] signout');

export const login = createAction(
  '[Authentication] login',
  props<{ email: string; password: string; routeToMap: boolean }>()
);
export const loginSuccess = createAction(
  '[Authentication] login success',
  props<{ user: any; access_token: string; routeToMap: boolean }>()
);
export const loginFailure = createAction(
  '[Authentication] login failure',
  props<{ error: Error }>()
);

export const signup = createAction(
  '[Authentication] signup',
  props<{ createUserInfo: any; }>()
);
export const signupSuccess = createAction(
  '[Authentication] signup success',
  props<{ user: any; access_token: string }>()
);
export const signupFailure = createAction(
  '[Authentication] signup failure',
  props<{ error: Error }>()
);
