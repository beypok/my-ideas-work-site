import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ProjectPhaseState} from "./project-phase.state";

export const selectProjectPhases = createFeatureSelector<ProjectPhaseState>('projectPhases');

export const selectAllProjectPhases = createSelector(
   selectProjectPhases,
   (state: ProjectPhaseState) => [...state.projectPhases],
);
