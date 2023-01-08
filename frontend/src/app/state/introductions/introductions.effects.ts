import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as IntroductionActions from './introductions.actions';
import { IntroductionService } from './introductions.service';

@Injectable()
export class IntroductionEffects {
   // openAddIntroductionDialog$ = createEffect(() =>
   //    this.actions$.pipe(
   //       ofType(IntroductionActions.openAddIntroductionDialog),
   //       switchMap((action): Observable<any> => {
   //          this.dialogService.open(AddIntroductionDialogComponent, { disableClose: true });
   //          return EMPTY;
   //       }),
   //    ),
   // );
   // closeAddIntroductionDialog$ = createEffect(() =>
   //    this.actions$.pipe(
   //       ofType(
   //          IntroductionActions.closeAddIntroductionDialog,
   //          IntroductionActions.addIntroductionToCreate,
   //       ),
   //       switchMap((action): Observable<any> => {
   //          this.dialogService.closeAll();
   //          return EMPTY;
   //       }),
   //    ),
   // );

   createIntroduction$ = createEffect(() =>
      this.actions$.pipe(
         ofType(IntroductionActions.createIntroduction),
         switchMap((action): Observable<any> => {
            return this.IntroductionService.createIntroduction(action.introduction).pipe(
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

   getMyIntroductions = createEffect(() =>
      this.actions$.pipe(
         ofType(
            IntroductionActions.getMyIntroductions,
            IntroductionActions.createIntroductionSuccess,
            IntroductionActions.approveIntroductionSuccess,
            IntroductionActions.denyIntroductionSuccess,
         ),
         switchMap((action): Observable<any> => {
            return this.IntroductionService.getMyIntroduction().pipe(
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
            return this.IntroductionService.getAllIntroduction().pipe(
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
            return this.IntroductionService.getApprovedIntroductions().pipe(
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
            return this.IntroductionService.getApprovedIntroduction(action.id).pipe(
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
            return this.IntroductionService.approveIntroduction(action.introduction).pipe(
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
            return this.IntroductionService.denyIntroduction(action.introduction).pipe(
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

   constructor(
      private actions$: Actions<any>,
      private IntroductionService: IntroductionService,
      private dialogService: MatDialog,
   ) {}
}
