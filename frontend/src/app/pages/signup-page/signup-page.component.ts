import { Component, ViewEncapsulation } from '@angular/core';

@Component({
   selector: 'signup-page',
   templateUrl: './signup-page.component.html',
   styleUrls: ['./signup-page.component.scss'],
   encapsulation: ViewEncapsulation.None,
   host: {
      class: 'sign-in-page-container',
   },
})
export class SignUpPageComponent {}
