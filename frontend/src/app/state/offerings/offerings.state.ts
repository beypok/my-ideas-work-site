import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   approvedOfferings: Offering[];
   myOfferings: Offering[];
   offeringsToCreate: Offering[];
   error: Error | null;
}

export const initialState: OfferingState = {
   approvedOfferings: [],
   myOfferings: [],
   offeringsToCreate: [],
   error: null,
};
