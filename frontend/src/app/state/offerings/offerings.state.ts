import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   approvedOfferings: Offering[];
   myOfferings: Offering[];
   allOfferings: Offering[];
   offeringsToCreate: Offering[];
   error: Error | null;
}

export const initialState: OfferingState = {
   approvedOfferings: [],
   myOfferings: [],
   allOfferings: [],
   offeringsToCreate: [],
   error: null,
};
