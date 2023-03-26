import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY, map, Observable, skip } from 'rxjs';
import { JWTTokenService } from '../services/jwt-token/jwt-token.service';
import { selectIsLoggedIn, selectLoggingIn, selectReAuthProcessed } from '../state/authentication';
import { AuthenticationService } from '../state/authentication/authentication.service';

@Injectable({
   providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
   private $loggingIn: Observable<boolean>;

   private loggingIn: boolean = false;

   private $loggedIn: Observable<boolean>;

   private loggedIn: boolean = false;

   private $reauthProcessed: Observable<boolean>;

   private reauthProcessed: boolean = false;

   constructor(
      private router: Router,
      private store: Store,
      @Inject(JWTTokenService) private jwtService: JWTTokenService,
      @Inject(AuthenticationService) private authService: AuthenticationService,
   ) {
      this.$loggingIn = this.store.select(selectLoggingIn);
      this.$loggingIn.subscribe((loggingIn) => {
         this.loggingIn = loggingIn;
      });
      this.$loggedIn = this.store.select(selectIsLoggedIn);
      this.$loggedIn.subscribe((loggedIn) => {
         this.loggedIn = loggedIn;
      });
      this.$reauthProcessed = this.store.select(selectReAuthProcessed);
      this.$reauthProcessed.subscribe((reauthProcessed) => {
         this.reauthProcessed = reauthProcessed;
      });
   }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
   ): Observable<boolean> | Promise<boolean> | boolean {
      const token = this.authService.getAccessToken();
      const expired = token && this.jwtService.isTokenExpired(token);

      if (token && this.loggedIn) {
         if (expired) {
            console.log('Your access token is expired!');
            this.loggedIn = false;
            return combineLatest([this.$loggingIn, this.$reauthProcessed]).pipe(
               map(() => {
                  return !this.loggingIn && this.loggedIn && this.reauthProcessed;
               }),
            );
         } else {
            return true;
         }
      } else {
         if (token) {
            return this.$reauthProcessed.pipe(
               skip(1),
               map(() => {
                  return !this.loggingIn && this.loggedIn && this.reauthProcessed;
               }),
            );
         } else {
            console.log('YOU ARE NOT SIGNED IN');
            this.router.navigateByUrl(
               `/signin?redirect_uri=/${next.url.map((u) => u.path).join('/')}`,
            );
            return EMPTY;
         }
      }
   }
}
