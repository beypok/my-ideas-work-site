import { Expose } from 'class-transformer';
import { BaseUserDto } from './../users/BaseUser.dto';
import { BaseOfferingDto } from './BaseOffering.dto';

export class ResponseOfferingDto extends BaseOfferingDto {
   @Expose()
   offeringId!: number;

   @Expose()
   user!: BaseUserDto;
}
