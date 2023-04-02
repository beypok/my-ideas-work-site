import { createFeatureSelector, createSelector } from '@ngrx/store';
import {IndustryState} from "./industry.state";

export const selectIndustries = createFeatureSelector<IndustryState>('industries');

export const selectAllIndustries = createSelector(
   selectIndustries,
   (state: IndustryState) => [...state.industries],
);
