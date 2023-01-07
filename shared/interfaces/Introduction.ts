import { ApprovalState } from '../enums';
import { User } from './User';

export interface Introduction {
   introductionId?: number;
   userId?: number;
   contactEmail?: string;
   message?: string;
   approvalState?: ApprovalState;
   user?: User;
}
