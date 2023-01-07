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
import { MyIntroductionsPageComponent } from './my-introductions-page/my-introductions-page.component';
import { MyIntroductionsPageModule } from './my-introductions-page/my-introductions-page.module';
import { MyOfferingsPageComponent } from './my-offerings-page/my-offerings-page.component';
import { MyOfferingsPageModule } from './my-offerings-page/my-offerings-page.module';
import { OfferingPageComponent } from './offering-page/offering-page.component';
import { OfferingPageModule } from './offering-page/offering-page.module';
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
   Offering = 'offering',
   Signin = 'signin',
   Signup = 'signup',
   MyIntroductions = 'my-introductions',
   MyOfferings = 'my-offerings',
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
   {
      path: SiteRouteNames.Offering + '/:id',
      component: OfferingPageComponent,
      canActivate: [AuthorizeGuard],
   },
   { path: SiteRouteNames.Signin, component: SignInPageComponent },
   { path: SiteRouteNames.Signup, component: SignUpPageComponent },
   {
      path: SiteRouteNames.MyOfferings,
      component: MyOfferingsPageComponent,
      canActivate: [AuthorizeGuard],
   },
   {
      path: SiteRouteNames.MyIntroductions,
      component: MyIntroductionsPageComponent,
      canActivate: [AuthorizeGuard],
   },

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
      MyOfferingsPageModule,
      OfferingsPageModule,
      OfferingPageModule,
      ApprovalDashboardPageModule,
      MyIntroductionsPageModule,
   ],
   exports: [RouterModule],
})
export class PagesModule {}
