import { Expose } from 'class-transformer';
import { ResponseOfferingFileDto } from '../offering-files';
import { ResponseUserDto } from '../users';
import { BaseOfferingDto } from './BaseOffering.dto';

export class ResponseOfferingDto extends BaseOfferingDto {
   @Expose()
   offeringId!: number;

   @Expose()
   user!: ResponseUserDto;

   @Expose()
   offeringFiles!: ResponseOfferingFileDto[];
}
