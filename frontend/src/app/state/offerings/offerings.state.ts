import { Offering } from '@myideaswork/common/interfaces';

export interface OfferingState {
   offerings: Offering[];
   error: Error | null;
}

export const initialState: OfferingState = {
   offerings: [],
   error: null,
};
