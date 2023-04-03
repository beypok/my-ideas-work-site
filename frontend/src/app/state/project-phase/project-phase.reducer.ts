import { Action, createReducer, on } from '@ngrx/store';
import {ProjectPhaseState, initialState} from "./project-phase.state";
import * as ProjectPhaseActions from './project-phase.actions';

const industryReducer = createReducer(
   initialState,
   on(ProjectPhaseActions.getProjectPhasesSuccess, (state, action) => ({
      ...state,
      projectPhases: action.projectPhases,
   })),
);

export function reducer(state: ProjectPhaseState | undefined, action: Action) {
   return industryReducer(state, action);
}
