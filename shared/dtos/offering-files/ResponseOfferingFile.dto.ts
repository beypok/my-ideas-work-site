import { Expose } from 'class-transformer';
import { ResponseOfferingDto } from '../offerings';
import { BaseOfferingFileDto } from './BaseOfferingFile.dto';

export class ResponseOfferingFileDto extends BaseOfferingFileDto {
   @Expose()
   offeringFileId!: number;

   @Expose()
   offering!: ResponseOfferingDto;

   @Expose()
   override name!: string;

   @Expose()
   override url!: string;
}
