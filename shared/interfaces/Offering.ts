import { ApprovalState, Collateral, Location, OfferingType, ProjectPhase, Terms } from '../enums';

export interface Offering {
   offeringId?: number;
   name?: string;
   description?: string;
   offeringType?: OfferingType;
   location?: Location;
   collateral?: Collateral;
   terms?: Terms;
   contactEmail?: string;
   approvalState?: ApprovalState;
   projectPhase?: ProjectPhase;
   amountRequested?: number | null;
   amountRangeStart?: number | null;
   amountRangeEnd?: number | null;
}
