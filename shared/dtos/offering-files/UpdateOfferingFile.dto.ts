import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { BaseOfferingFileDto } from './BaseOfferingFile.dto';

export class UpdateOfferingFilesDto {
   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => UpdateOfferingFileDto)
   items!: UpdateOfferingFileDto[];
}

export class UpdateOfferingFileDto extends BaseOfferingFileDto {
   @IsInt()
   offeringFileId!: number;

   @IsOptional()
   override name!: string;

   @IsOptional()
   override url!: string;
}
