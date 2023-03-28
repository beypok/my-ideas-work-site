import { Expose } from 'class-transformer';
import {BaseIndustryDto} from "./BaseIndustry.dto";

export class ResponseIndustryDto extends BaseIndustryDto {
   @Expose()
   id!: number;

   @Expose()
   override name: string;
}
