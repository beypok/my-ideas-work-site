import { Action, createReducer, on } from '@ngrx/store';
import * as IntroductionActions from './introductions.actions';
import { initialState, IntroductionState } from './introductions.state';

const introductionReducer = createReducer(
   initialState,
   on(IntroductionActions.getMyIntroductionsSuccess, (state, action) => ({
      ...state,
      myOfferings: action.introductions,
   })),
   on(IntroductionActions.getAllIntroductionsSuccess, (state, action) => ({
      ...state,
      allOfferings: action.introductions,
   })),
   on(IntroductionActions.getApprovedIntroductionsSuccess, (state, action) => ({
      ...state,
      approvedOfferings: action.introductions,
   })),
   on(IntroductionActions.getApprovedIntroductionSuccess, (state, action) => ({
      ...state,
      approvedOffering: action.introduction,
   })),
   on(IntroductionActions.addIntroductionToCreate, (state, action) => {
      let firstNegativeValue = -1;
      while (state.introductionsToCreate.some((o) => o.introductionId === firstNegativeValue)) {
         firstNegativeValue--;
      }

      return {
         ...state,
         introductionsToCreate: [
            ...state.introductionsToCreate,
            { ...action.introduction, offeringId: firstNegativeValue },
         ],
      };
   }),
   on(IntroductionActions.clearIntroductionToCreate, (state, action) => {
      return {
         ...state,
         introductionsToCreate: [],
      };
   }),
   on(IntroductionActions.createIntroductionSuccess, (state) => ({
      ...state,
   })),
   on(IntroductionActions.createIntroductionFailure, (state, action) => ({
      ...state,
      error: action.error,
   })),
);

export function reducer(state: IntroductionState | undefined, action: Action) {
   return introductionReducer(state, action);
}
