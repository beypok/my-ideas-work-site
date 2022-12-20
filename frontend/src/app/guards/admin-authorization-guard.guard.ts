import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, skip } from 'rxjs';
import { selectCurrentUser } from '../state/authentication';

@Injectable({
   providedIn: 'root',
})
export class AdminAuthorizeGuard implements CanActivate {
   private currentUser: User | null = null;

   private $currentUser: Observable<User | null>;

   constructor(private store: Store) {
      this.$currentUser = this.store.select(selectCurrentUser);
      this.$currentUser.subscribe((currentUser) => {
         this.currentUser = currentUser;
      });
   }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
   ): Observable<boolean> | Promise<boolean> | boolean {
      return combineLatest([this.$currentUser]).pipe(
         skip(1),
         map(() => {
            return !!(this.currentUser && this.currentUser.isAdmin);
         }),
      );
   }
}
