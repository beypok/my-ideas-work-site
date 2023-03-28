import { Expose } from 'class-transformer';
import {IsInt, IsString} from 'class-validator';
import { Industry as IIndustry } from '../../interfaces';

export class BaseIndustryDto implements IIndustry {
   @IsInt()
   @Expose()
   id!: number;

   @IsString()
   @Expose()
   name!: string;
}
