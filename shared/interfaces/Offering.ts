import {
   ApprovalState,
   Collateral,
   Industries,
   InvestorOfferingType,
   Location,
   ProjectPhase,
   Terms,
} from '../enums';
import { OfferingFile } from './OfferingFile';
import { User } from './User';

export interface Offering {
   offeringId?: number;
   name?: string;
   description?: string;
   investorOfferingType?: InvestorOfferingType;
   industry?: Industries;
   location?: Location;
   collateral?: Collateral;
   terms?: Terms;
   contactEmail?: string;
   approvalState?: ApprovalState;
   projectPhase?: ProjectPhase;
   amountRequested?: number | null;
   amountRangeStart?: number | null;
   amountRangeEnd?: number | null;
   user?: User;
   offeringFiles?: OfferingFile[];
}
