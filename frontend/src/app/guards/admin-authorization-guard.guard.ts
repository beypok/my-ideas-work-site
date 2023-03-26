import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentUserIsAdmin } from '../state/authentication';

@Injectable({
   providedIn: 'root',
})
export class AdminAuthorizeGuard implements CanActivate {
   private $currentUserIsAdmin: Observable<boolean>;

   constructor(private store: Store) {
      this.$currentUserIsAdmin = this.store.select(selectCurrentUserIsAdmin);
   }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
   ): Observable<boolean> | Promise<boolean> | boolean {
      return this.$currentUserIsAdmin;
   }
}
