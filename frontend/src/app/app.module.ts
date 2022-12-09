import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarModule } from './components/navigation-bar/navigation-bar.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers, metaReducers } from './state';
import { AppStateModule } from './state/app/app.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SELECT_CONFIG } from '@angular/material/select';

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
   providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
   bootstrap: [AppComponent],
})
export class AppModule {}

