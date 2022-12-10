import { AppState } from './app';
import { AuthenticationState } from './authentication';
import { OfferingState } from './offerings/offerings.state';

export interface State {
   app: AppState;
   authentication: AuthenticationState;
   offerings: OfferingState;
}
