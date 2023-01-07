import { Expose } from 'class-transformer';
import { BaseUserDto } from '../users/BaseUser.dto';
import { BaseIntroductionDto } from './BaseIntroduction.dto';

export class ResponseIntroductionDto extends BaseIntroductionDto {
   @Expose()
   introductionId!: number;

   @Expose()
   user!: BaseUserDto;

   @Expose()
   override message!: string;

   @Expose()
   override contactEmail!: string;
}
