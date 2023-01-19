import { AccountType } from './../enums';

export interface User {
   id?: number;
   email?: string;
   password?: string;
   accountType?: AccountType;
   isAdmin?: boolean;
   purchasedIntroductions?: number;
   customerId?: string | null;
}

export interface AuthenticatedUser {
   user: User;
   access_token: string;
}
