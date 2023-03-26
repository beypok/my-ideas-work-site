import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import {
   ApprovalState,
   Collateral,
   Industries,
   InvestorOfferingType,
   Location,
   ProjectPhase,
   Terms,
} from '../../enums';
import { Offering as IOffering } from '../../interfaces';
import { ResponseOfferingFileDto } from '../offering-files';

export class BaseOfferingDto implements IOffering {
   @IsEnum(InvestorOfferingType)
   @Expose()
   investorOfferingType!: InvestorOfferingType;

   @IsEnum(Industries)
   @Expose()
   industry!: Industries;

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

   @Expose()
   offeringFiles!: ResponseOfferingFileDto[];
}
