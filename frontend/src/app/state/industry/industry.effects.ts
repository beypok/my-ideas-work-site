import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {IndustryService} from "./industry.service";
import * as IndustryActions from './industry.actions';

@Injectable()
export class IndustryEffects {
   getIndustries = createEffect(() =>
      this.actions$.pipe(
         ofType(IndustryActions.getIndustries),
         switchMap((action): Observable<any> => {
            return this.industryService.getIndustries().pipe(
               switchMap((response) => {
                  return of(
                     IndustryActions.getIndustriesSuccess({industries: response}),
                  );
               }),
               catchError((error) => {
                  return of(IndustryActions.getIndustriesFailure({error}));
               }),
            );
         }),
      ),
   );


   constructor(
      private actions$: Actions<any>,
      private industryService: IndustryService,
   ) {
   }
}
