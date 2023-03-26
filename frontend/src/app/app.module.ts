import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { NavigationBarModule } from './components/navigation-bar/navigation-bar.module';
import { PagesModule } from './pages/pages.module';
import { metaReducers, reducers } from './state';
import { AppStateModule } from './state/app/app.module';
import { AuthenticationInterceptor } from './state/authentication/AuthenticationInterceptor.service';

@NgModule({
   declarations: [AppComponent],
   imports: [
      AppStateModule,
      NavigationBarModule,
      PagesModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(reducers, {
         metaReducers,
      }),
      StoreDevtoolsModule.instrument({
         maxAge: 25,
         logOnly: environment.production,
      }),
      EffectsModule.forRoot([]),
   ],
   providers: [
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}

