import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from 'src/app/state/authentication';

@Component({
   selector: 'signin-page',
   templateUrl: './signin-page.component.html',
   styleUrls: ['./signin-page.component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
      class: 'sign-in-page-container',
   },
})
export class SignInPageComponent {
   isLoggedIn$: Observable<boolean>;

   constructor(private store: Store) {
      this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
   }
}
