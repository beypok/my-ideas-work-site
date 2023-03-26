import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseAuthenticatedUserDto } from '@myideaswork/common/dtos';
import { PaymentMethod } from '@myideaswork/common/interfaces';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteRouteNames } from 'src/app/pages/pages.module';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationEffects {
   signout$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.signout),
         switchMap((action): Observable<any> => {
            this.authService.signout();
            return EMPTY;
         }),
      ),
   );

   login$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.login),
         switchMap(
            (action): Observable<any> =>
               this.authService.login({ email: action.email, password: action.password }).pipe(
                  map((response: any) => {
                     return AuthenticationActions.loginSuccess({
                        ...response,
                     });
                  }),
                  catchError((error: any) => of(AuthenticationActions.loginFailure({ error }))),
               ),
         ),
      ),
   );

   loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.loginSuccess),
         switchMap((action): Observable<any> => {
            this.authService.setAccessToken(action.access_token);

            const parsedRoute = this.router.parseUrl(this.router.url);
            if (parsedRoute.queryParams && parsedRoute.queryParams['redirect_uri']) {
               this.router.navigateByUrl(parsedRoute.queryParams['redirect_uri']);
               return EMPTY;
            }
            this.router.navigateByUrl('/' + SiteRouteNames.MyOfferings);

            return EMPTY;
         }),
      ),
   );

   reauthSuccess$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.reAuthenticateSuccess),
         switchMap((action): Observable<any> => {
            this.authService.setAccessToken(action.access_token);
            return EMPTY;
         }),
      ),
   );

   reAuthenticate$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.reAuthenticate),
         switchMap((action): Observable<any> => {
            return this.authService.reAuthenticate().pipe(
               map((response: ResponseAuthenticatedUserDto) => {
                  return AuthenticationActions.reAuthenticateSuccess({
                     user: response.user,
                     access_token: response.access_token,
                  });
               }),
               catchError((error: any) => {
                  return of(AuthenticationActions.reAuthenticateFailure({ error }));
               }),
            );
         }),
      ),
   );

   signup$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.signup),
         switchMap(
            (action): Observable<any> =>
               this.authService.signup(action.createUserInfo).pipe(
                  map((response: ResponseAuthenticatedUserDto) => {
                     return AuthenticationActions.signupSuccess({
                        user: response.user,
                        access_token: response.access_token,
                     });
                  }),
                  catchError((error: any) => {
                     return of(AuthenticationActions.signupFailure({ error }));
                  }),
               ),
         ),
      ),
   );

   loadPaymentMethods$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.loadCustomerPaymentMethods),
         switchMap(
            (action): Observable<any> =>
               this.authService.getCustomerPaymentMethods().pipe(
                  map((response: PaymentMethod[]) => {
                     return AuthenticationActions.loadCustomerPaymentMethodsSuccess({
                        paymentMethods: response,
                     });
                  }),
                  catchError((error: any) => {
                     return of(AuthenticationActions.loadCustomerPaymentMethodsFailure({ error }));
                  }),
               ),
         ),
      ),
   );

   signupSuccess$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.signupSuccess),
         switchMap((action): Observable<any> => {
            this.authService.setAccessToken(action.access_token);
            this.router.navigateByUrl('/' + SiteRouteNames.MyOfferings);
            return EMPTY;
         }),
      ),
   );

   signupFailure$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthenticationActions.signupFailure),
         switchMap((action): Observable<any> => {
            return EMPTY;
         }),
      ),
   );

   constructor(
      private actions$: Actions<any>,
      private authService: AuthenticationService,
      private router: Router,
   ) {}
}
