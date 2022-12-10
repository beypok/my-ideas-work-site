import { CreateOfferingDto, ResponseOfferingDto } from '@myideaswork/common/dtos';
import { createAction, props } from '@ngrx/store';

export const openAddOfferingDialog = createAction('[Offerings] Open add offering dialog');
export const closeAddOfferingDialog = createAction('[Offerings] Close add offering dialog');

export const createOffering = createAction(
   '[Offerings] Create Offering',
   props<{ offering: CreateOfferingDto }>(),
);
export const createOfferingSuccess = createAction(
   '[Offerings] Create Offering success',
   props<{ offering: ResponseOfferingDto }>(),
);
export const createOfferingFailure = createAction(
   '[Offerings] Create Offering failure',
   props<{ error: Error }>(),
);

export const getMyOfferings = createAction('[Offerings] Get My Offering');
export const getMyOfferingsSuccess = createAction(
   '[Offerings] Get My Offering success',
   props<{ offerings: ResponseOfferingDto[] }>(),
);
export const getMyOfferingsFailure = createAction(
   '[Offerings] Get My Offering failure',
   props<{ error: Error }>(),
);
