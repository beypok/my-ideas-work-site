import { CallState } from '@myideaswork/common/enums';
import { Action, createReducer, on } from '@ngrx/store';
import * as OfferingActions from './offerings.actions';
import { initialState, OfferingState } from './offerings.state';

const offeringReducer = createReducer(
   initialState,
   on(OfferingActions.getMyOfferingsSuccess, (state, action) => ({
      ...state,
      myOfferings: action.offerings,
   })),
   on(OfferingActions.getAllOfferingsSuccess, (state, action) => ({
      ...state,
      allOfferings: action.offerings,
   })),
   on(OfferingActions.getApprovedOfferingsSuccess, (state, action) => ({
      ...state,
      approvedOfferings: action.offerings,
   })),
   on(OfferingActions.getApprovedOfferingSuccess, (state, action) => ({
      ...state,
      approvedOffering: action.offering,
   })),
   on(OfferingActions.batchSaveOffering, (state, action) => ({
      ...state,
      callState: CallState.Loading,
   })),
   on(OfferingActions.batchSaveOfferingSuccess, (state, action) => ({
      ...state,
      myOfferings: action.offerings,
      offeringsToCreate: [],
      callState: CallState.Loaded,
   })),
   on(OfferingActions.batchSaveOfferingFailure, (state, action) => ({
      ...state,
      error: action.error,
      callState: CallState.Error,
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
