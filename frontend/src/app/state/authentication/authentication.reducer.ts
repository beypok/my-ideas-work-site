import { Action, createReducer, on } from '@ngrx/store';
import { purchaseIntroductionsSuccess } from '../introductions/introductions.actions';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationState, initialState } from './authentication.state';

const authenticationReducer = createReducer(
   initialState,
   on(AuthenticationActions.signout, (state) => ({
      ...state,
      isLoggedIn: false,
      loggingIn: false,
      loginFailAttempt: false,
      currentUser: null,
   })),
   on(AuthenticationActions.login, (state) => ({
      ...state,
      isLoggedIn: false,
      loggingIn: true,
      loginFailAttempt: false,
   })),
   on(AuthenticationActions.loginSuccess, (state, action) => ({
      ...state,
      isLoggedIn: true,
      loggingIn: false,
      currentUser: action.user,
      loginFailAttempt: false,
   })),
   on(AuthenticationActions.loginFailure, (state, action) => ({
      ...state,
      isLoggedIn: false,
      loggingIn: false,
      error: action.error,
      loginFailAttempt: true,
   })),
   on(AuthenticationActions.reAuthenticate, (state, action) => ({
      ...state,
      reauthProcessed: false,
   })),
   on(
      AuthenticationActions.reAuthenticateSuccess,
      purchaseIntroductionsSuccess,
      (state, action) => ({
         ...state,
         isLoggedIn: true,
         loggingIn: false,
         currentUser: action.user,
         reauthProcessed: true,
      }),
   ),
   on(AuthenticationActions.reAuthenticateFailure, (state, action) => ({
      ...state,
      reauthProcessed: true,
   })),
   on(AuthenticationActions.signup, (state) => ({
      ...state,
      signingUp: true,
   })),
   on(AuthenticationActions.signupSuccess, (state, action) => ({
      ...state,
      isLoggedIn: true,
      signingUp: false,
      currentUser: action.user,
   })),
   on(AuthenticationActions.signupFailure, (state, action) => ({
      ...state,
      isLoggedIn: false,
      signingUp: false,
      error: action.error,
   })),
   on(AuthenticationActions.loadCustomerPaymentMethods, (state) => ({
      ...state,
   })),
   on(AuthenticationActions.loadCustomerPaymentMethodsSuccess, (state, action) => ({
      ...state,
      paymentMethods: action.paymentMethods,
   })),
   on(AuthenticationActions.loadCustomerPaymentMethodsFailure, (state, action) => ({
      ...state,
      error: action.error,
   })),
);

export function reducer(state: AuthenticationState | undefined, action: Action) {
   return authenticationReducer(state, action);
}
