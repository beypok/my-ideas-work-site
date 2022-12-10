import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { BaseOfferingDto } from './BaseOffering.dto';
import { ApprovalState } from './../../enums';

export class CreateOfferingsDto {
   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => CreateOfferingDto)
   items!: CreateOfferingDto[];
}

export class CreateOfferingDto extends BaseOfferingDto {
   @Exclude()
   override approvalState?: ApprovalState;
}
