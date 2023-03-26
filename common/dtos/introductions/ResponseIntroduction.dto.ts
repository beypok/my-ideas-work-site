import { Expose } from 'class-transformer';
import { ResponseOfferingDto } from '../offerings';
import { ResponseUserDto } from '../users';
import { BaseIntroductionDto } from './BaseIntroduction.dto';

export class ResponseIntroductionDto extends BaseIntroductionDto {
   @Expose()
   introductionId!: number;

   @Expose()
   createUser!: ResponseUserDto;

   @Expose()
   receiveUser!: ResponseUserDto;

   @Expose()
   offering!: ResponseOfferingDto;

   @Expose()
   override message!: string;

   @Expose()
   override contactEmail!: string;
}
