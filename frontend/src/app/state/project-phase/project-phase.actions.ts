import {
   ResponseProjectPhaseDto
} from '@myideaswork/common/dtos';
import { createAction, props } from '@ngrx/store';

export const getProjectPhases = createAction('[ProjectPhase] Get All ProjectPhases');
export const getProjectPhasesSuccess = createAction(
   '[ProjectPhase] Get All ProjectPhases success',
   props<{ projectPhases: ResponseProjectPhaseDto[] }>(),
);
export const getProjectPhasesFailure = createAction(
   '[ProjectPhase] Get All ProjectPhases failure',
   props<{ error: Error }>(),
);
