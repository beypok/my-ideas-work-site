import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferingState } from './offerings.state';

export const selectOfferings = createFeatureSelector<OfferingState>('offerings');

export const selectMyOfferings = createSelector(
   selectOfferings,
   (state: OfferingState) => state.myOfferings,
);
