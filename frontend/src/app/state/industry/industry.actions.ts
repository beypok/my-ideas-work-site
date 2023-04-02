import {
   ResponseIndustryDto
} from '@myideaswork/common/dtos';
import { createAction, props } from '@ngrx/store';

export const getIndustries = createAction('[Industry] Get All Industries');
export const getIndustriesSuccess = createAction(
   '[Industry] Get All Industries success',
   props<{ industries: ResponseIndustryDto[] }>(),
);
export const getIndustriesFailure = createAction(
   '[Industry] Get All Industries failure',
   props<{ error: Error }>(),
);
