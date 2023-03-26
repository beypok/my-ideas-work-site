import { Type } from 'class-transformer';
import {
   ArrayNotEmpty,
   IsArray,
   IsEmail,
   IsEnum,
   IsInt,
   IsOptional,
   IsString,
   ValidateNested,
} from 'class-validator';
import { ApprovalState } from '../../enums';
import { BaseIntroductionDto } from './BaseIntroduction.dto';

export class UpdateIntroductionsDto {
   @IsArray()
   @ArrayNotEmpty()
   @ValidateNested({ each: true })
   @Type(() => UpdateIntroductionDto)
   items!: UpdateIntroductionDto[];
}

export class UpdateIntroductionDto extends BaseIntroductionDto {
   @IsInt()
   introductionId!: number;

   @IsEmail()
   @IsOptional()
   override contactEmail!: string;

   @IsString()
   @IsOptional()
   override message!: string;

   @IsEnum(ApprovalState)
   @IsOptional()
   override approvalState!: ApprovalState;
}
