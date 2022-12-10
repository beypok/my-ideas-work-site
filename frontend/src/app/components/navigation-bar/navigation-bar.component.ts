import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SiteRouteNames } from 'src/app/pages/pages.module';
import { selectIsLoggedIn } from 'src/app/state/authentication';

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
      { route: SiteRouteNames.MyInfo, label: 'My Info' },
   ];

   routes = [...this.defaultRoutes];

   private isLoggedIn$: Observable<boolean>;

   private isLoggedIn: boolean = false;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store) {
      this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

      this.isLoggedIn$.pipe(takeUntil(this.destroyed$)).subscribe((isLoggedIn) => {
         this.isLoggedIn = isLoggedIn;
         this.routes = [...this.defaultRoutes].filter((r) => {
            if (this.isLoggedIn) {
               return !(r.route === SiteRouteNames.Signin || r.route === SiteRouteNames.Signup);
            } else {
               return r.route !== SiteRouteNames.MyInfo;
            }
         });
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }
}
