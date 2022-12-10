import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as AuthenticationReducer from './authentication/authentication.reducer';
import * as AppReducer from './app/app.reducer';
import * as OfferingsReducer from './offerings/offerings.reducer';

export const reducers: ActionReducerMap<State> = {
   app: AppReducer.reducer,
   authentication: AuthenticationReducer.reducer,
   offerings: OfferingsReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
