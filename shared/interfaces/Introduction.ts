import { ApprovalState } from '../enums';
import { Offering } from './Offering';
import { User } from './User';

export interface Introduction {
   introductionId?: number;
   createUserId?: number | null;
   receiveUserId?: number;
   contactEmail?: string | null;
   message?: string;
   approvalState?: ApprovalState;
   createUser?: User;
   receiveUser?: User;
   offering?: Offering;
}
