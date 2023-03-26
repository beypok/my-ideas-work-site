import {
   CreateIntroductionDto,
   ResponseIntroductionDto,
   ResponseUserDto,
} from '@myideaswork/common/dtos';
import { Introduction, Offering, PaymentCredentials } from '@myideaswork/common/interfaces';
import { createAction, props } from '@ngrx/store';

export const openAddIntroductionDialog = createAction(
   '[Introductions] Open add introduction dialog',
   props<{ offering: Offering }>(),
);

export const closeAddIntroductionDialog = createAction(
   '[Introductions] Close add introduction dialog',
);

export const openPurchaseIntroductionsDialog = createAction(
   '[Introductions] Open purchase introduction dialog',
);

export const closePurchaseIntroductionsDialog = createAction(
   '[Introductions] Close purchase introduction dialog',
);

export const createIntroduction = createAction(
   '[Introductions] Create Introduction',
   props<{ introduction: CreateIntroductionDto }>(),
);
export const createIntroductionSuccess = createAction(
   '[Introductions] Create Introduction success',
   props<{ introduction: ResponseIntroductionDto }>(),
);
export const createIntroductionFailure = createAction(
   '[Introductions] Create Introduction failure',
   props<{ error: Error }>(),
);

export const purchaseIntroductions = createAction(
   '[Introductions] Purchase Introductions',
   props<{ paymentCredentials: PaymentCredentials }>(),
);
export const purchaseIntroductionsSuccess = createAction(
   '[Introductions] Purchase Introductions success',
   props<{ user: ResponseUserDto }>(),
);
export const purchaseIntroductionsFailure = createAction(
   '[Introductions] Purchase Introductions failure',
   props<{ error: Error }>(),
);

export const getAllIntroductions = createAction('[Introductions] Get All Introductions');
export const getAllIntroductionsSuccess = createAction(
   '[Introductions] Get All Introductions success',
   props<{ introductions: ResponseIntroductionDto[] }>(),
);
export const getAllIntroductionsFailure = createAction(
   '[Introductions] Get All Introductions failure',
   props<{ error: Error }>(),
);

export const getMyIntroductions = createAction('[Introductions] Get My Introductions');
export const getMyIntroductionsSuccess = createAction(
   '[Introductions] Get My Introductions success',
   props<{ introductions: ResponseIntroductionDto[] }>(),
);
export const getMyIntroductionsFailure = createAction(
   '[Introductions] Get My Introductions failure',
   props<{ error: Error }>(),
);

export const getApprovedIntroduction = createAction(
   '[Introductions] Get Approved Introduction',
   props<{ id: number }>(),
);
export const getApprovedIntroductionSuccess = createAction(
   '[Introductions] Get Approved Introduction success',
   props<{ introduction: ResponseIntroductionDto }>(),
);
export const getApprovedIntroductionFailure = createAction(
   '[Introductions] Get Approved Introduction failure',
   props<{ error: Error }>(),
);

export const getApprovedIntroductions = createAction('[Introductions] Get Approved Introductions');
export const getApprovedIntroductionsSuccess = createAction(
   '[Introductions] Get Approved Introductions success',
   props<{ introductions: ResponseIntroductionDto[] }>(),
);
export const getApprovedIntroductionsFailure = createAction(
   '[Introductions] Get Approved Introductions failure',
   props<{ error: Error }>(),
);

export const approveIntroduction = createAction(
   '[Introductions] Approve Introduction',
   props<{ introduction: Introduction }>(),
);
export const approveIntroductionSuccess = createAction(
   '[Introductions] Approve Introduction success',
   props<{ introduction: ResponseIntroductionDto }>(),
);
export const approveIntroductionFailure = createAction(
   '[Introductions] Approve Introduction failure',
   props<{ error: Error }>(),
);

export const denyIntroduction = createAction(
   '[Introductions] Deny Introduction',
   props<{ introduction: Introduction }>(),
);
export const denyIntroductionSuccess = createAction(
   '[Introductions] Deny Introduction success',
   props<{ introduction: ResponseIntroductionDto }>(),
);
export const denyIntroductionFailure = createAction(
   '[Introductions] Deny Introduction failure',
   props<{ error: Error }>(),
);
