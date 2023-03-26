import {
   BatchSaveOfferingsDto,
   CreateOfferingDto,
   ResponseOfferingDto,
} from '@myideaswork/common/dtos';
import { Offering } from '@myideaswork/common/interfaces';
import { createAction, props } from '@ngrx/store';

export const openAddOfferingDialog = createAction('[Offerings] Open add offering dialog');

export const closeAddOfferingDialog = createAction('[Offerings] Close add offering dialog');

export const addOfferingToCreate = createAction(
   '[Offerings] Add Offerings to Create',
   props<{ offering: CreateOfferingDto }>(),
);

export const clearOfferingToCreate = createAction('[Offerings] Clear Offerings to Create');

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

export const getAllOfferings = createAction('[Offerings] Get All Offerings');
export const getAllOfferingsSuccess = createAction(
   '[Offerings] Get All Offerings success',
   props<{ offerings: ResponseOfferingDto[] }>(),
);
export const getAllOfferingsFailure = createAction(
   '[Offerings] Get All Offerings failure',
   props<{ error: Error }>(),
);

export const getMyOfferings = createAction('[Offerings] Get My Offerings');
export const getMyOfferingsSuccess = createAction(
   '[Offerings] Get My Offerings success',
   props<{ offerings: ResponseOfferingDto[] }>(),
);
export const getMyOfferingsFailure = createAction(
   '[Offerings] Get My Offerings failure',
   props<{ error: Error }>(),
);

export const getApprovedOffering = createAction(
   '[Offerings] Get Approved Offering',
   props<{ id: number }>(),
);
export const getApprovedOfferingSuccess = createAction(
   '[Offerings] Get Approved Offering success',
   props<{ offering: ResponseOfferingDto }>(),
);
export const getApprovedOfferingFailure = createAction(
   '[Offerings] Get Approved Offering failure',
   props<{ error: Error }>(),
);

export const getApprovedOfferings = createAction('[Offerings] Get Approved Offerings');
export const getApprovedOfferingsSuccess = createAction(
   '[Offerings] Get Approved Offerings success',
   props<{ offerings: ResponseOfferingDto[] }>(),
);
export const getApprovedOfferingsFailure = createAction(
   '[Offerings] Get Approved Offerings failure',
   props<{ error: Error }>(),
);

export const batchSaveOffering = createAction(
   '[Offerings] Batch Save Offering',
   props<{ batchSaveOfferings: BatchSaveOfferingsDto }>(),
);
export const batchSaveOfferingSuccess = createAction(
   '[Offerings] Batch Save Offering success',
   props<{ offerings: ResponseOfferingDto[] }>(),
);
export const batchSaveOfferingFailure = createAction(
   '[Offerings] Batch Save Offering failure',
   props<{ error: Error }>(),
);

export const approveOffering = createAction(
   '[Offerings] Approve Offering',
   props<{ offering: Offering }>(),
);
export const approveOfferingSuccess = createAction(
   '[Offerings] Approve Offering success',
   props<{ offering: ResponseOfferingDto }>(),
);
export const approveOfferingFailure = createAction(
   '[Offerings] Approve Offering failure',
   props<{ error: Error }>(),
);

export const denyOffering = createAction(
   '[Offerings] Deny Offering',
   props<{ offering: Offering }>(),
);
export const denyOfferingSuccess = createAction(
   '[Offerings] Deny Offering success',
   props<{ offering: ResponseOfferingDto }>(),
);
export const denyOfferingFailure = createAction(
   '[Offerings] Deny Offering failure',
   props<{ error: Error }>(),
);
