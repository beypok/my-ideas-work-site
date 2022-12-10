import { BaseOfferingDto } from './BaseOffering.dto';
import { Expose } from 'class-transformer';
import {
   ApprovalState,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '../../enums';

export class ResponseOfferingDto extends BaseOfferingDto {
   @Expose()
   offeringId!: number;
}
