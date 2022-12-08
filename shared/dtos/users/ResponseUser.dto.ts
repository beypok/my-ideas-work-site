import { BaseUserDto } from './BaseUser.dto';
import { Expose, Exclude, Type } from 'class-transformer';
import { AuthenticatedUser, User } from './../../interfaces';
import { AccountType } from './../../enums';

export class ResponseUserDto extends BaseUserDto {
   @Expose()
   id!: number;

   @Exclude()
   override password!: string;

   @Expose()
   override accountType!: AccountType;
}

export class ResponseAuthenticatedUserDto implements AuthenticatedUser {
   @Expose()
   @Type(() => ResponseUserDto)
   user!: User;

   @Expose()
   access_token!: string;
}
