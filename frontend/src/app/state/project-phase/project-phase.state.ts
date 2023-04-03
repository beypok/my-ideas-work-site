import { ProjectPhase } from '@myideaswork/common/interfaces';

export interface ProjectPhaseState {
   projectPhases: ProjectPhase[];
   error: Error | null;
}

export const initialState: ProjectPhaseState = {
   projectPhases: [],
   error: null,
};
