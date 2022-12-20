import { Exclude, Expose, Type } from 'class-transformer';
import { AccountType } from './../../enums';
import { AuthenticatedUser, User } from './../../interfaces';
import { BaseUserDto } from './BaseUser.dto';

export class ResponseUserDto extends BaseUserDto {
   @Expose()
   id!: number;

   @Exclude()
   override password!: string;

   @Expose()
   override accountType!: AccountType;

   @Expose()
   isAdmin!: boolean;

   @Expose()
   isRegistered!: boolean;
}

export class ResponseAuthenticatedUserDto implements AuthenticatedUser {
   @Expose()
   @Type(() => ResponseUserDto)
   user!: User;

   @Expose()
   access_token!: string;
}
