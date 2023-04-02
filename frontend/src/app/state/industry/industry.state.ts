import { Industry } from '@myideaswork/common/interfaces';

export interface IndustryState {
   industries: Industry[];
   error: Error | null;
}

export const initialState: IndustryState = {
   industries: [],
   error: null,
};
