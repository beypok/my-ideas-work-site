import { Component } from '@angular/core'
import { SiteRouteNames } from 'src/app/pages/pages.module'

export interface SiteRoute {
   route: string,
   label: string
}

@Component({
   selector: 'navigation-bar',
   templateUrl: './navigation-bar.component.html',
   styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
   routes: SiteRoute[] = [
      {route: SiteRouteNames.Home, label: 'Home'},
      {route: SiteRouteNames.About, label: 'About'},
      {route: SiteRouteNames.HowItWorks, label: 'How It Works'},
      {route: SiteRouteNames.Contact, label: 'Contact Us'},
      {route: SiteRouteNames.Offerings, label: 'Offerings'},
      {route: SiteRouteNames.Signin, label: 'Signin / Signup'}
   ]

}