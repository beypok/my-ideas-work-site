import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { ApprovalState } from '../../enums';
import { Introduction as IIntroduction } from '../../interfaces';

export class BaseIntroductionDto implements IIntroduction {
   @IsInt()
   @Expose()
   offeringId!: number;

   @IsEmail()
   @Expose()
   contactEmail!: string;

   @IsString()
   @Expose()
   message!: string;

   @IsEnum(ApprovalState)
   @Expose()
   approvalState?: ApprovalState;
}
