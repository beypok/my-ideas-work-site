import { Expose, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { BaseOfferingFileDto } from './BaseOfferingFile.dto';

export class CreateOfferingFilesDto {
   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => CreateOfferingFileDto)
   items!: CreateOfferingFileDto[];
}

export class CreateOfferingFileDto extends BaseOfferingFileDto {
   @IsObject()
   file!: any;

   @IsNumber()
   @Expose()
   offeringId!: number;
}
