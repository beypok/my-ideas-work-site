import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   myOfferings: Offering[];
   error: Error | null;
}

export const initialState: OfferingState = {
   myOfferings: [],
   error: null,
};
