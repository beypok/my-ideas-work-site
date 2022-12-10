import {
   ApprovalState,
   Collateral,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '../../enums';
import { Offering as IOffering } from '../../interfaces';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class BaseOfferingDto implements IOffering {
   @IsEnum(OfferingType)
   @Expose()
   offeringType!: OfferingType;

   @IsString()
   @Expose()
   name!: string;

   @IsString()
   @Expose()
   description!: string;

   @IsEnum(Location)
   @Expose()
   location!: Location;

   @IsEnum(Collateral)
   @Expose()
   collateral!: Collateral;

   @IsEnum(Terms)
   @Expose()
   terms!: Terms;

   @IsEmail()
   @Expose()
   contactEmail!: string;

   @IsEnum(ApprovalState)
   @Expose()
   approvalState?: ApprovalState;

   @IsEnum(ProjectPhase)
   @Expose()
   projectPhase!: ProjectPhase;

   @Expose()
   amountRequested!: number | null;

   @Expose()
   amountRangeStart!: number | null;

   @Expose()
   amountRangeEnd!: number | null;
}
