import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {ProjectPhaseService} from "./project-phase.service";
import * as ProjectPhaseActions from './project-phase.actions';

@Injectable()
export class ProjectPhaseEffects {
   getProjectPhases = createEffect(() =>
      this.actions$.pipe(
         ofType(ProjectPhaseActions.getProjectPhases),
         switchMap((action): Observable<any> => {
            return this.projectPhaseService.getProjectPhases().pipe(
               switchMap((response) => {
                  return of(
                     ProjectPhaseActions.getProjectPhasesSuccess({projectPhases: response}),
                  );
               }),
               catchError((error) => {
                  return of(ProjectPhaseActions.getProjectPhasesFailure({error}));
               }),
            );
         }),
      ),
   );


   constructor(
      private actions$: Actions<any>,
      private projectPhaseService: ProjectPhaseService,
   ) {
   }
}
