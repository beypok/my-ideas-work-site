import {
   ChangeDetectionStrategy,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offering } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { selectIsRegistered } from 'src/app/state/authentication';
import { selectOffering } from 'src/app/state/offerings/offerings.selector';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   selector: 'offering-page',
   templateUrl: './offering-page.component.html',
   styleUrls: ['./offering-page.component.scss'],
})
export class OfferingPageComponent implements OnDestroy, OnInit {
   offering: Offering | null = null;

   offering$: Observable<Offering | null>;

   isRegistered$: Observable<boolean>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
      this.offering$ = this.store.select(selectOffering(+this.route.snapshot.params['id']));
      this.isRegistered$ = this.store.select(selectIsRegistered);
   }

   ngOnInit(): void {}

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onContact() {}

   onBack() {
      this.router.navigateByUrl('/offerings');
   }
}
