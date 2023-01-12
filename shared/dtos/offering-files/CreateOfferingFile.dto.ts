import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { BaseOfferingFileDto } from './BaseOfferingFile.dto';

export class CreateOfferingFilesDto {
   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => CreateOfferingFileDto)
   items!: CreateOfferingFileDto[];
}

export class CreateOfferingFileDto extends BaseOfferingFileDto {}
