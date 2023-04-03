import {AppState} from './app';
import {AuthenticationState} from './authentication';
import {IntroductionState} from './introductions/introductions.state';
import {OfferingState} from './offerings/offerings.state';
import {IndustryState} from "./industry/industry.state";
import {ProjectPhaseState} from "./project-phase/project-phase.state";

export interface State {
   app: AppState;
   authentication: AuthenticationState;
   offerings: OfferingState;
   introductions: IntroductionState;
   industries: IndustryState;
   projectPhases: ProjectPhaseState;
}
