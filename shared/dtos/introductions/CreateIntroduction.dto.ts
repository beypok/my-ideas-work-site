import { Exclude, Expose, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, ValidateNested } from 'class-validator';
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

   @IsInt()
   @Expose()
   receiveUserId!: number;

   @IsInt()
   @Expose()
   createUserId!: number;
}
