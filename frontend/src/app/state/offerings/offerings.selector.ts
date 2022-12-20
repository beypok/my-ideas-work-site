import { Offering } from '@myideaswork/common/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferingState } from './offerings.state';

export const selectOfferings = createFeatureSelector<OfferingState>('offerings');

export const selectApprovedOfferings = createSelector(selectOfferings, (state: OfferingState) => [
   ...state.approvedOfferings,
]);

export const selectOffering = (id: number) =>
   createSelector(selectOfferings, (state: OfferingState) => {
      return state.allOfferings.find((o) => o.offeringId === id) ?? null;
   });

export const selectMyOfferings = createSelector(selectOfferings, (state: OfferingState) => [
   ...state.myOfferings,
]);

export const selectAllOfferings = createSelector(selectOfferings, (state: OfferingState) => [
   ...state.allOfferings,
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
