import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SiteRouteNames } from 'src/app/pages/pages.module';
import { selectCurrentUserIsAdmin, selectIsLoggedIn, signout } from 'src/app/state/authentication';

export interface SiteRoute {
   route: string;
   label: string;
}

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'navigation-bar',
   templateUrl: './navigation-bar.component.html',
   styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnDestroy {
   defaultRoutes: SiteRoute[] = [
      { route: SiteRouteNames.Home, label: 'Home' },
      { route: SiteRouteNames.About, label: 'About' },
      { route: SiteRouteNames.HowItWorks, label: 'How It Works' },
      { route: SiteRouteNames.Contact, label: 'Contact Us' },
      { route: SiteRouteNames.Offerings, label: 'Offerings' },
      { route: SiteRouteNames.Signin, label: 'Sign In' },
      { route: SiteRouteNames.Signup, label: 'Sign Up' },
   ];

   routes = [...this.defaultRoutes];

   isUserAdmin$: Observable<boolean>;

   isLoggedIn: boolean = false;

   private isLoggedIn$: Observable<boolean>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private router: Router) {
      this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
      this.isUserAdmin$ = this.store.select(selectCurrentUserIsAdmin);

      this.isLoggedIn$.pipe(takeUntil(this.destroyed$)).subscribe((isLoggedIn) => {
         this.isLoggedIn = isLoggedIn;
         this.routes = [...this.defaultRoutes].filter((r) => {
            if (this.isLoggedIn) {
               return !(r.route === SiteRouteNames.Signin || r.route === SiteRouteNames.Signup);
            }
            return r;
         });
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onLogoutClick(): void {
      this.store.dispatch(signout());
   }

   onOfferingsClick(): void {
      this.router.navigateByUrl('/my-offerings');
   }

   onIntroductionsClick(): void {
      this.router.navigateByUrl('/my-introductions');
   }

   onDashboardClick(): void {
      this.router.navigateByUrl('/approval-dashboard');
   }
}
