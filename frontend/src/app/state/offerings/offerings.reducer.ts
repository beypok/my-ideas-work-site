import { Action, createReducer, on } from '@ngrx/store';
import * as OfferingActions from './offerings.actions';
import { initialState, OfferingState } from './offerings.state';

const offeringReducer = createReducer(
   initialState,
   on(OfferingActions.getMyOfferingsSuccess, (state, action) => ({
      ...state,
      offerings: action.offerings,
   })),
   on(OfferingActions.createOffering, (state) => ({
      ...state,
   })),
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
