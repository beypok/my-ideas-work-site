import { Action, createReducer, on } from '@ngrx/store';
import * as IntroductionActions from './introductions.actions';
import { initialState, IntroductionState } from './introductions.state';

const introductionReducer = createReducer(
   initialState,
   on(IntroductionActions.getMyIntroductionsSuccess, (state, action) => ({
      ...state,
      myIntroductions: action.introductions,
   })),
   on(IntroductionActions.getAllIntroductionsSuccess, (state, action) => ({
      ...state,
      allIntroductions: action.introductions,
   })),
   on(IntroductionActions.getApprovedIntroductionsSuccess, (state, action) => ({
      ...state,
      approvedIntroductions: action.introductions,
   })),
   on(IntroductionActions.getApprovedIntroductionSuccess, (state, action) => ({
      ...state,
      approvedIntroduction: action.introduction,
   })),
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
