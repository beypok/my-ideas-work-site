import { Expose } from 'class-transformer';
import { BaseOfferingDto } from '../offerings/BaseOffering.dto';
import { BaseUserDto } from '../users/BaseUser.dto';
import { BaseIntroductionDto } from './BaseIntroduction.dto';

export class ResponseIntroductionDto extends BaseIntroductionDto {
   @Expose()
   introductionId!: number;

   @Expose()
   createUser!: BaseUserDto;

   @Expose()
   receiveUser!: BaseUserDto;

   @Expose()
   offering!: BaseOfferingDto;

   @Expose()
   override message!: string;

   @Expose()
   override contactEmail!: string;
}
