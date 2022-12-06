import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AccountType } from '../../enums';
import { BaseUserDto } from './BaseUser.dto';

export class UpdateUsersDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  items!: UpdateUserDto[];
}

export class UpdateUserDto extends BaseUserDto {
  @IsOptional()
  @IsInt()
  id!: number;

  @IsOptional()
  override email!: string;

  @IsOptional()
  override password!: string;

  @IsOptional()
  override accountType!: AccountType;
}
