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
import { getApprovedOffering } from 'src/app/state/offerings/offerings.actions';
import { selectApprovedOffering } from 'src/app/state/offerings/offerings.selector';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   selector: 'offering-page',
   templateUrl: './offering-page.component.html',
   styleUrls: ['./offering-page.component.scss'],
})
export class OfferingPageComponent implements OnDestroy, OnInit {
   offering$: Observable<Offering | null>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
      this.store.dispatch(getApprovedOffering({ id: +this.route.snapshot.params['id'] }));
      this.offering$ = this.store.select(selectApprovedOffering);
   }

   ngOnInit(): void {}

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onRequestIntroduction() {
      console.log('trigger payment');
   }

   onBack() {
      this.router.navigateByUrl('/offerings');
   }
}
