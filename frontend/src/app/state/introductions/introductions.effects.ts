import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AddIntroductionDialogComponent } from 'src/app/components/add-introduction-dialog/add-introduction-dialog.component';
import { PurchaseIntroductionsDialogComponent } from 'src/app/components/purchase-introductions-dialog/purchase-introductions-dialog.component';
import * as IntroductionActions from './introductions.actions';
import { IntroductionService } from './introductions.service';

@Injectable()
export class IntroductionEffects {
   openAddIntroductionDialog$ = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.openAddIntroductionDialog),
         switchMap((action): Observable<any> => {
            this.addIntroductionDialogRef = this.dialogService.open(
               AddIntroductionDialogComponent,
               {
                  disableClose: true,
                  data: { offering: action.offering },
               },
            );
            return EMPTY;
         }),
      ),
   );

   closeAddIntroductionDialog$ = createEffect(() =>
      this.actions$.pipe(
         ofType(
            IntroductionActions.closeAddIntroductionDialog,
            IntroductionActions.createIntroductionSuccess,
         ),
         switchMap((action): Observable<any> => {
            this.addIntroductionDialogRef?.close();
            return EMPTY;
         }),
      ),
   );

   openPurchaseIntroductionDialog$ = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.openPurchaseIntroductionsDialog),
         switchMap((action): Observable<any> => {
            this.purchaseIntroductionsRef = this.dialogService.open(
               PurchaseIntroductionsDialogComponent,
               {
                  disableClose: true,
               },
            );
            return EMPTY;
         }),
      ),
   );

   closePurchaseIntroductionDialog$ = createEffect(() =>
      this.actions$.pipe(
         ofType(
            IntroductionActions.closePurchaseIntroductionsDialog,
            IntroductionActions.purchaseIntroductionsSuccess,
         ),
         switchMap((action): Observable<any> => {
            this.purchaseIntroductionsRef?.close();
            return EMPTY;
         }),
      ),
   );

   createIntroduction$ = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.createIntroduction),
         switchMap((action): Observable<any> => {
            return this.introductionService.createIntroduction(action.introduction).pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.createIntroductionSuccess({ introduction: response }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.createIntroductionFailure({ error }));
               }),
            );
         }),
      ),
   );

   purchaseIntroduction$ = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.purchaseIntroductions),
         switchMap((action): Observable<any> => {
            return this.introductionService.purchaseIntroductions(action.paymentCredentials).pipe(
               switchMap((response) => {
                  return of(IntroductionActions.purchaseIntroductionsSuccess({ user: response }));
               }),
               catchError((error) => {
                  return of(IntroductionActions.purchaseIntroductionsFailure({ error }));
               }),
            );
         }),
      ),
   );

   getMyIntroductions = createEffect(() =>
      this.actions$.pipe(
         ofType(
            IntroductionActions.getMyIntroductions,
            IntroductionActions.createIntroductionSuccess,
            IntroductionActions.approveIntroductionSuccess,
            IntroductionActions.denyIntroductionSuccess,
         ),
         switchMap((action): Observable<any> => {
            return this.introductionService.getMyIntroduction().pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.getMyIntroductionsSuccess({ introductions: response }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.getMyIntroductionsFailure({ error }));
               }),
            );
         }),
      ),
   );

   getAllIntroductions = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.getAllIntroductions),
         switchMap((action): Observable<any> => {
            return this.introductionService.getAllIntroduction().pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.getAllIntroductionsSuccess({ introductions: response }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.getAllIntroductionsFailure({ error }));
               }),
            );
         }),
      ),
   );

   getApprovedIntroductions = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.getApprovedIntroductions),
         switchMap((action): Observable<any> => {
            return this.introductionService.getApprovedIntroductions().pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.getApprovedIntroductionsSuccess({
                        introductions: response,
                     }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.getApprovedIntroductionsFailure({ error }));
               }),
            );
         }),
      ),
   );

   getApprovedIntroduction = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.getApprovedIntroduction),
         switchMap((action): Observable<any> => {
            return this.introductionService.getApprovedIntroduction(action.id).pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.getApprovedIntroductionSuccess({
                        introduction: response,
                     }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.getApprovedIntroductionFailure({ error }));
               }),
            );
         }),
      ),
   );

   approvedIntroduction = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.approveIntroduction),
         switchMap((action): Observable<any> => {
            return this.introductionService.approveIntroduction(action.introduction).pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.approveIntroductionSuccess({ introduction: response }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.approveIntroductionFailure({ error }));
               }),
            );
         }),
      ),
   );

   denyIntroduction = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.denyIntroduction),
         switchMap((action): Observable<any> => {
            return this.introductionService.denyIntroduction(action.introduction).pipe(
               switchMap((response) => {
                  return of(
                     IntroductionActions.denyIntroductionSuccess({ introduction: response }),
                  );
               }),
               catchError((error) => {
                  return of(IntroductionActions.denyIntroductionFailure({ error }));
               }),
            );
         }),
      ),
   );

   private purchaseIntroductionsRef: MatDialogRef<
      PurchaseIntroductionsDialogComponent,
      any
   > | null = null;

   private addIntroductionDialogRef: MatDialogRef<AddIntroductionDialogComponent, any> | null =
      null;

   constructor(
      private actions$: Actions<any>,
      private introductionService: IntroductionService,
      private dialogService: MatDialog,
   ) {}
}
