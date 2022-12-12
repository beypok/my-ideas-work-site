import { Offering } from '@myideaswork/common/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferingState } from './offerings.state';

export const selectOfferings = createFeatureSelector<OfferingState>('offerings');

export const selectApprovedOfferings = createSelector(selectOfferings, (state: OfferingState) => [
   ...state.approvedOfferings,
]);

export const selectMyOfferings = createSelector(selectOfferings, (state: OfferingState) => [
   ...state.myOfferings,
]);

export const selectOfferingsToCreate = createSelector(selectOfferings, (state: OfferingState) => [
   ...state.offeringsToCreate,
]);

export const selectAllMyOfferings = createSelector(
   selectMyOfferings,
   selectOfferingsToCreate,
   (myOfferings: Offering[], offeringsToCreate: Offering[]) => [
      ...myOfferings,
      ...offeringsToCreate,
   ],
);
