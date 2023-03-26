import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateOfferingFileDto } from '../offering-files';
import { CreateOfferingDto } from './CreateOffering.dto';
import { UpdateOfferingDto } from './UpdateOffering.dto';

export class BatchSaveOfferingsDto {
   data!: BatchSaveOfferingsDataDto;

   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => CreateOfferingFileDto)
   files!: CreateOfferingFileDto[];
}

export class BatchSaveOfferingsDataDto {
   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => CreateOfferingDto)
   itemsToCreate!: CreateOfferingDto[];

   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => UpdateOfferingDto)
   itemsToUpdate!: UpdateOfferingDto[];

   @IsArray()
   itemsToDeleteIds!: number[];
}
