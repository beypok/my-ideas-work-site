import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const selectAuthentication = createFeatureSelector<AuthenticationState>('authentication');

export const selectIsLoggedIn = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.isLoggedIn,
);

export const selectLoggingIn = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.loggingIn,
);

export const selectCurrentUser = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.currentUser,
);

export const selectCurrentUserIsAdmin = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.currentUser?.isAdmin ?? false,
);

export const selectSigningUp = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.signingUp,
);

export const selectAuthErrors = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.error,
);

export const selectLoginFail = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.loginFailAttempt,
);

export const selectReAuthProcessed = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.reauthProcessed,
);

export const selectPaymentMethods = createSelector(
   selectAuthentication,
   (state: AuthenticationState) => state.paymentMethods,
);
