import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   myOfferings: Offering[];
   offeringsToCreate: Offering[];
   error: Error | null;
}

export const initialState: OfferingState = {
   myOfferings: [],
   offeringsToCreate: [],
   error: null,
};
