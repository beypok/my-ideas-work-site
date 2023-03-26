import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { OfferingFile as IOfferingFile } from '../../interfaces';

export class BaseOfferingFileDto implements IOfferingFile {
   @IsString()
   @Expose()
   name!: string;

   @IsString()
   @Expose()
   url!: string;
}
