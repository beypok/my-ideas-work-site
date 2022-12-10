import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AddOfferingDialogComponent } from 'src/app/components/add-offering-dialog/add-offering-dialog.component';
import * as OfferingActions from './offerings.actions';
import { OfferingService } from './offerings.service';

@Injectable()
export class OfferingEffects {
   openAddOfferingDialog$ = createEffect(() =>
      this.actions$.pipe(
         ofType(OfferingActions.openAddOfferingDialog),
         switchMap((action): Observable<any> => {
            const ref = this.dialogService.open(AddOfferingDialogComponent, { disableClose: true });
            return ref.afterClosed();
         }),
      ),
   );
   closeAddOfferingDialog$ = createEffect(() =>
      this.actions$.pipe(
         ofType(OfferingActions.closeAddOfferingDialog, OfferingActions.addOfferingToCreate),
         switchMap((action): Observable<any> => {
            this.dialogService.closeAll();
            return EMPTY;
         }),
      ),
   );

   createOffering$ = createEffect(() =>
      this.actions$.pipe(
         ofType(OfferingActions.createOffering),
         switchMap((action): Observable<any> => {
            return this.offeringService.createOffering(action.offering).pipe(
               switchMap((response) => {
                  return of(OfferingActions.createOfferingSuccess({ offering: response }));
               }),
               catchError((error) => {
                  return of(OfferingActions.createOfferingFailure({ error }));
               }),
            );
         }),
      ),
   );

   getMyOfferings = createEffect(() =>
      this.actions$.pipe(
         ofType(OfferingActions.getMyOfferings, OfferingActions.createOfferingSuccess),
         switchMap((action): Observable<any> => {
            return this.offeringService.getMyOffering().pipe(
               switchMap((response) => {
                  return of(OfferingActions.getMyOfferingsSuccess({ offerings: response }));
               }),
               catchError((error) => {
                  return of(OfferingActions.getMyOfferingsFailure({ error }));
               }),
            );
         }),
      ),
   );

   constructor(
      private actions$: Actions<any>,
      private offeringService: OfferingService,
      private dialogService: MatDialog,
   ) {}
}
