import { Component, OnDestroy } from '@angular/core';
import { ApprovalState } from '@myideaswork/common/enums';
import { Offering } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
   approveOffering,
   denyOffering,
   getAllOfferings,
} from 'src/app/state/offerings/offerings.actions';
import { selectAllOfferings } from 'src/app/state/offerings/offerings.selector';

@Component({
   selector: 'approval-dashboard-page',
   templateUrl: './approval-dashboard-page.component.html',
   styleUrls: ['./approval-dashboard-page.component.scss'],
})
export class ApprovalDashboardPageComponent implements OnDestroy {
   allOfferings: Offering[] = [];

   allOfferings$: Observable<Offering[]>;

   selectedOffering: Offering | null = null;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store) {
      this.store.dispatch(getAllOfferings());
      this.allOfferings$ = this.store.select(selectAllOfferings);
      this.allOfferings$.pipe(takeUntil(this.destroyed$)).subscribe((allOfferings) => {
         this.allOfferings = [...allOfferings];
         if (!this.selectedOffering) {
            this.selectedOffering = this.allOfferings[0];
         } else {
            this.selectedOffering =
               this.allOfferings.find((o) => o.offeringId === this.selectedOffering?.offeringId) ??
               this.allOfferings[0];
         }
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   getOfferingApprovalStateClass(offering: Offering): string {
      if (offering.approvalState === ApprovalState.Approved) {
         return 'approved';
      } else if (offering.approvalState === ApprovalState.Denied) {
         return 'denied';
      }
      return 'pending';
   }

   getOfferingApprovalStateText(offering: Offering): string {
      if (offering.approvalState === ApprovalState.Approved) {
         return 'Approved';
      } else if (offering.approvalState === ApprovalState.Denied) {
         return 'Denied';
      }
      return '* This offering is still awaiting approval';
   }

   onSelectOffering(offering: Offering): void {
      this.selectedOffering = offering;
   }

   onDeny() {
      if (this.selectedOffering)
         this.store.dispatch(denyOffering({ offering: this.selectedOffering }));
   }

   onApprove() {
      if (this.selectedOffering)
         this.store.dispatch(approveOffering({ offering: this.selectedOffering }));
   }
}
