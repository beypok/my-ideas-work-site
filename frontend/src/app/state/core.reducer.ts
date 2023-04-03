import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as AppReducer from './app/app.reducer';
import * as AuthenticationReducer from './authentication/authentication.reducer';
import { State } from './core.state';
import * as IntroductionsReducer from './introductions/introductions.reducer';
import * as OfferingsReducer from './offerings/offerings.reducer';
import * as IndustryReducer from './industry/industry.reducer';
import * as ProjectPhaseReducer from './project-phase/project-phase.reducer';

export const reducers: ActionReducerMap<State> = {
   app: AppReducer.reducer,
   authentication: AuthenticationReducer.reducer,
   offerings: OfferingsReducer.reducer,
   introductions: IntroductionsReducer.reducer,
   industries: IndustryReducer.reducer,
   projectPhases: ProjectPhaseReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
