import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IntroductionState } from './introductions.state';

export const selectIntroductions = createFeatureSelector<IntroductionState>('introductions');

export const selectApprovedIntroductions = createSelector(
   selectIntroductions,
   (state: IntroductionState) => [...state.approvedIntroductions],
);

export const selectApprovedIntroduction = createSelector(
   selectIntroductions,
   (state: IntroductionState) => state.approvedIntroduction,
);

export const selectIntroduction = (id: number) =>
   createSelector(selectIntroductions, (state: IntroductionState) => {
      return state.allIntroductions.find((o) => o.introductionId === id) ?? null;
   });

export const selectMyIntroductions = createSelector(
   selectIntroductions,
   (state: IntroductionState) => [...state.myIntroductions],
);

export const selectAllIntroductions = createSelector(
   selectIntroductions,
   (state: IntroductionState) => [...state.allIntroductions],
);
