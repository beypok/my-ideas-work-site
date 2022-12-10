import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOfferingDto } from './CreateOffering.dto';
import { UpdateOfferingDto } from './UpdateOffering.dto';

export class BatchSaveOfferingsDto {
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
