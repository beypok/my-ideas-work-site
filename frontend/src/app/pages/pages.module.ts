import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AboutPageModule } from './about-page/about-page.module';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactPageModule } from './contact-page/contact-page.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { HowItWorksPageComponent } from './how-it-works-page/how-it-works-page.component';
import { HowItWorksPageModule } from './how-it-works-page/how-it-works-page.module';
import { OfferingsPageComponent } from './offerings-page/offerings-page.component';
import { OfferingsPageModule } from './offerings-page/offerings-page.module';
import { SignInPageComponent } from './signin-page/signin-page.component';
import { SignInPageModule } from './signin-page/signin-page.module';

export enum SiteRouteNames {
   Home = 'home',
   About = 'about-us',
   HowItWorks = 'how-it-works',
   Contact = 'contact-us',
   Offerings = 'offerings',
   Signin = 'signin',
   MyInfo = 'my-info',
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
   { path: SiteRouteNames.MyInfo, component: HomePageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomePageModule,
    AboutPageModule,
    HowItWorksPageModule,
    ContactPageModule,
    SignInPageModule,
  ],
  exports: [RouterModule]
})
export class PagesModule {}
