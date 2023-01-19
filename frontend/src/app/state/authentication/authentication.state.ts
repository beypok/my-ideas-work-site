import { PaymentMethod, User } from '@myideaswork/common/interfaces';

export interface AuthenticationState {
   isLoggedIn: boolean;
   loggingIn: boolean;
   signingUp: boolean;
   currentUser: User | null;
   paymentMethods: PaymentMethod[];
   error: Error | null;
   reauthProcessed: boolean;
   loginFailAttempt: boolean;
}

export const initialState: AuthenticationState = {
   isLoggedIn: false,
   loggingIn: false,
   signingUp: false,
   currentUser: null,
   paymentMethods: [],
   error: null,
   reauthProcessed: true,
   loginFailAttempt: false,
};
