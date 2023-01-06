import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   approvedOfferings: Offering[];
   approvedOffering: Offering | null;
   myOfferings: Offering[];
   allOfferings: Offering[];
   offeringsToCreate: Offering[];
   error: Error | null;
}

export const initialState: OfferingState = {
   approvedOfferings: [],
   approvedOffering: null,
   myOfferings: [],
   allOfferings: [],
   offeringsToCreate: [],
   error: null,
};
