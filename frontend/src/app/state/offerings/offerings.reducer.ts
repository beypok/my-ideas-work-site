import { Action, createReducer, on } from '@ngrx/store';
import * as OfferingActions from './offerings.actions';
import { initialState, OfferingState } from './offerings.state';

const offeringReducer = createReducer(
   initialState,
   on(OfferingActions.getMyOfferingsSuccess, (state, action) => ({
      ...state,
      myOfferings: action.offerings,
   })),
   on(OfferingActions.batchSaveOfferingSuccess, (state, action) => ({
      ...state,
      myOfferings: action.offerings,
      offeringsToCreate: [],
   })),
   on(OfferingActions.addOfferingToCreate, (state, action) => {
      let firstNegativeValue = -1;
      while (state.offeringsToCreate.some((o) => o.offeringId === firstNegativeValue)) {
         firstNegativeValue--;
      }

      return {
         ...state,
         offeringsToCreate: [
            ...state.offeringsToCreate,
            { ...action.offering, offeringId: firstNegativeValue },
         ],
      };
   }),
   on(OfferingActions.clearOfferingToCreate, (state, action) => {
      return {
         ...state,
         offeringsToCreate: [],
      };
   }),
   on(OfferingActions.createOfferingSuccess, (state) => ({
      ...state,
   })),
   on(OfferingActions.createOfferingFailure, (state, action) => ({
      ...state,
      error: action.error,
   })),
);

export function reducer(state: OfferingState | undefined, action: Action) {
   return offeringReducer(state, action);
}
