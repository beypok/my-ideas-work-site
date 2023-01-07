import { Introduction } from '@myideaswork/common/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IntroductionState } from './introductions.state';

export const selectIntroductions = createFeatureSelector<IntroductionState>('offerings');

export const selectApprovedOfferings = createSelector(
   selectIntroductions,
   (state: IntroductionState) => [...state.approvedIntroductions],
);

export const selectApprovedOffering = createSelector(
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

export const selectAllOfferings = createSelector(
   selectIntroductions,
   (state: IntroductionState) => [...state.allIntroductions],
);

export const selectIntroductionsToCreate = createSelector(
   selectIntroductions,
   (state: IntroductionState) => [...state.introductionsToCreate],
);

export const selectAllMyOfferings = createSelector(
   selectMyIntroductions,
   selectIntroductionsToCreate,
   (myOfferings: Introduction[], introductionsToCreate: Introduction[]) => [
      ...myOfferings,
      ...introductionsToCreate,
   ],
);
