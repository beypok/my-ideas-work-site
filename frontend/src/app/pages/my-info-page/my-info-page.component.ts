import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
   batchSaveOffering,
   clearOfferingToCreate,
   getMyOfferings,
   openAddOfferingDialog,
} from 'src/app/state/offerings/offerings.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Offering } from '@myideaswork/common/interfaces';
import {
   selectAllMyOfferings,
   selectOfferingsToCreate,
} from 'src/app/state/offerings/offerings.selector';
import { ApprovalState } from '@myideaswork/common/enums';
import { CreateOfferingDto } from '@myideaswork/common/dtos';

@Component({
   selector: 'my-info-page',
   templateUrl: './my-info-page.component.html',
   styleUrls: ['./my-info-page.component.scss'],
})
export class MyInfoPageComponent implements OnDestroy {
   allMyOfferings$: Observable<Offering[]>;

   offeringsToCreate$: Observable<Offering[]>;

   selectedOffering: Offering | null = null;

   offeringsToDelete = new Set<number>();

   offeringsToCreate: Offering[] = [];

   get hasChanges(): boolean {
      return this.offeringsToCreate.length > 0 || this.offeringsToDelete.size > 0;
   }

   private destroyed$ = new Subject<void>();

   constructor(private store: Store) {
      this.store.dispatch(getMyOfferings());
      this.allMyOfferings$ = this.store.select(selectAllMyOfferings);
      this.offeringsToCreate$ = this.store.select(selectOfferingsToCreate);
      this.offeringsToCreate$.pipe(takeUntil(this.destroyed$)).subscribe((offeringsToCreate) => {
         this.offeringsToCreate = offeringsToCreate;
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   addOfferingClick(e: MouseEvent): void {
      e.stopPropagation();
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

   onSelectOffering(offering: Offering): void {
      this.selectedOffering = offering;
   }

   onDeleteOffering(e: MouseEvent, offering: Offering): void {
      e.stopPropagation();
      if (offering.offeringId) this.offeringsToDelete.add(offering.offeringId);
   }

   isOfferingMarkedForDelete(offering: Offering): boolean {
      return !!offering.offeringId && this.offeringsToDelete.has(offering.offeringId);
   }

   handleCancelChanges(): void {
      this.offeringsToDelete.clear();
      this.store.dispatch(clearOfferingToCreate());
   }

   handleSubmitChanges(): void {
      this.store.dispatch(
         batchSaveOffering({
            batchSaveOfferings: {
               itemsToCreate: this.offeringsToCreate.map((o) => {
                  return {
                     ...o,
                     offeringId: 0,
                  };
               }) as CreateOfferingDto[],
               itemsToUpdate: [],
               itemsToDeleteIds: Array.from(this.offeringsToDelete).filter((id) => id > 0),
            },
         }),
      );
      this.offeringsToDelete.clear();
   }
}
