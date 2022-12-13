import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthorizeGuard } from '../guards/admin-authorization-guard.guard';
import { AuthorizeGuard } from '../guards/authorization-guard.guard';
import { AboutPageComponent } from './about-page/about-page.component';
import { AboutPageModule } from './about-page/about-page.module';
import { ApprovalDashboardPageComponent } from './approval-dashboard-page/approval-dashboard-page.component';
import { ApprovalDashboardPageModule } from './approval-dashboard-page/approval-dashboard-page.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactPageModule } from './contact-page/contact-page.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { HowItWorksPageComponent } from './how-it-works-page/how-it-works-page.component';
import { HowItWorksPageModule } from './how-it-works-page/how-it-works-page.module';
import { MyInfoPageComponent } from './my-info-page/my-info-page.component';
import { MyInfoPageModule } from './my-info-page/my-info-page.module';
import { OfferingsPageComponent } from './offerings-page/offerings-page.component';
import { OfferingsPageModule } from './offerings-page/offerings-page.module';
import { SignInPageComponent } from './signin-page/signin-page.component';
import { SignInPageModule } from './signin-page/signin-page.module';
import { SignUpPageComponent } from './signup-page/signup-page.component';
import { SignUpPageModule } from './signup-page/signup-page.module';

export enum SiteRouteNames {
   Home = 'home',
   About = 'about-us',
   HowItWorks = 'how-it-works',
   Contact = 'contact-us',
   Offerings = 'offerings',
   Signin = 'signin',
   Signup = 'signup',
   MyInfo = 'my-info',
   ApprovalDashboard = 'approval-dashboard',
}

const routes: Routes = [
   //   Default site routes
   { path: SiteRouteNames.Home, component: HomePageComponent },
   { path: '', redirectTo: SiteRouteNames.Home, pathMatch: 'full' },

   // Other site routes
   { path: SiteRouteNames.About, component: AboutPageComponent },
   { path: SiteRouteNames.HowItWorks, component: HowItWorksPageComponent },
   { path: SiteRouteNames.Contact, component: ContactPageComponent },
   { path: SiteRouteNames.Offerings, component: OfferingsPageComponent },
   { path: SiteRouteNames.Signin, component: SignInPageComponent },
   { path: SiteRouteNames.Signup, component: SignUpPageComponent },
   { path: SiteRouteNames.MyInfo, component: MyInfoPageComponent, canActivate: [AuthorizeGuard] },

   // Hidden/Admin routes
   {
      path: SiteRouteNames.ApprovalDashboard,
      component: ApprovalDashboardPageComponent,
      canActivate: [AuthorizeGuard, AdminAuthorizeGuard],
   },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes),
      HomePageModule,
      AboutPageModule,
      HowItWorksPageModule,
      ContactPageModule,
      SignInPageModule,
      SignUpPageModule,
      MyInfoPageModule,
      OfferingsPageModule,
      ApprovalDashboardPageModule,
   ],
   exports: [RouterModule],
})
export class PagesModule {}
