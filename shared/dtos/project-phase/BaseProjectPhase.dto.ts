import { Expose } from 'class-transformer';
import {IsInt, IsString} from 'class-validator';
import { ProjectPhase as IProjectPhase } from '../../interfaces';

export class BaseProjectPhaseDto implements IProjectPhase {
   @IsInt()
   @Expose()
   id!: number;

   @IsString()
   @Expose()
   name!: string;
}
