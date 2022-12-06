import { AccountType } from "./../enums";


export interface User {
   id?: number;
   email?: string;
   password?: string;
   accountType: AccountType
   isAdmin?: boolean;
}

export interface AuthenticatedUser {
  user: User;
  access_token: string;
}
