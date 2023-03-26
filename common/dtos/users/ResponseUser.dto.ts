import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { AccountType } from '../../enums';
import { AuthenticatedUser, User } from '../../interfaces';
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

   @IsInt()
   @Expose()
   purchasedIntroductions!: number;

   @IsString()
   @Expose()
   customerId?: string;
}

export class ResponseAuthenticatedUserDto implements AuthenticatedUser {
   @Expose()
   @Type(() => ResponseUserDto)
   user!: User;

   @Expose()
   access_token!: string;
}
