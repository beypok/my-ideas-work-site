import { Exclude, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApprovalState } from '../../enums';
import { BaseIntroductionDto } from './BaseIntroduction.dto';

export class CreateIntroductionsDto {
   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => CreateIntroductionDto)
   items!: CreateIntroductionDto[];
}

export class CreateIntroductionDto extends BaseIntroductionDto {
   @Exclude()
   override approvalState?: ApprovalState;
}
