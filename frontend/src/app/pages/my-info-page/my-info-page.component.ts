import { Component } from '@angular/core';
import { ResponseOfferingDto } from '@myideaswork/common/dtos';
import { Store } from '@ngrx/store';
import { getMyOfferings, openAddOfferingDialog } from 'src/app/state/offerings/offerings.actions';
import { Observable } from 'rxjs';
import { Offering } from '@myideaswork/common/interfaces';
import { selectMyOfferings } from 'src/app/state/offerings/offerings.selector';
import { ApprovalState } from '@myideaswork/common/enums';

@Component({
   selector: 'my-info-page',
   templateUrl: './my-info-page.component.html',
   styleUrls: ['./my-info-page.component.scss'],
})
export class MyInfoPageComponent {
   myOfferings$: Observable<Offering[]>;

   constructor(private store: Store) {
      this.store.dispatch(getMyOfferings());
      this.myOfferings$ = this.store.select(selectMyOfferings);
   }

   addOfferingClick() {
      this.store.dispatch(openAddOfferingDialog());
   }

   getOfferingApprovalStateClass(offering: Offering): string {
      if (offering.approvalState === ApprovalState.Approved) {
         return 'approved';
      } else if (offering.approvalState === ApprovalState.Denied) {
         return 'denied';
      }

      return 'pending';
   }
}
