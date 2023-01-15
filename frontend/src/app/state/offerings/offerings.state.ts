import { CallState } from '@myideaswork/common/enums';
import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   approvedOfferings: Offering[];
   approvedOffering: Offering | null;
   myOfferings: Offering[];
   allOfferings: Offering[];
   offeringsToCreate: Offering[];
   callState: CallState;
   error: Error | null;
}

export const initialState: OfferingState = {
   approvedOfferings: [],
   approvedOffering: null,
   myOfferings: [],
   allOfferings: [],
   offeringsToCreate: [],
   callState: CallState.Loaded,
   error: null,
};
