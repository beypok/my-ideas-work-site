import { AccountType } from '../../enums';
import { User as IUser } from '../../interfaces';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class BaseUserDto implements IUser {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsEnum(AccountType)
  @Expose()
  accountType!: AccountType;
}
