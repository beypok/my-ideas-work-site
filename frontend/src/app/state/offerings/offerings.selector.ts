import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferingState } from './offerings.state';

export const selectAuthentication = createFeatureSelector<OfferingState>('offering');

export const selectOfferings = createSelector(
   selectAuthentication,
   (state: OfferingState) => state.offerings,
);
