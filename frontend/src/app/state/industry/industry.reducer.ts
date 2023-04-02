import { Action, createReducer, on } from '@ngrx/store';
import {IndustryState, initialState} from "./industry.state";
import * as IndustryActions from './industry.actions';

const industryReducer = createReducer(
   initialState,
   on(IndustryActions.getIndustriesSuccess, (state, action) => ({
      ...state,
      industries: action.industries,
   })),
);

export function reducer(state: IndustryState | undefined, action: Action) {
   return industryReducer(state, action);
}
