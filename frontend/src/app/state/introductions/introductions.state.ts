import { Introduction } from '@myideaswork/common/interfaces';

export interface IntroductionState {
   approvedIntroductions: Introduction[];
   approvedIntroduction: Introduction | null;
   myIntroductions: Introduction[];
   allIntroductions: Introduction[];
   introductionsToCreate: Introduction[];
   error: Error | null;
}

export const initialState: IntroductionState = {
   approvedIntroductions: [],
   approvedIntroduction: null,
   myIntroductions: [],
   allIntroductions: [],
   introductionsToCreate: [],
   error: null,
};
