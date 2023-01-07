import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateOfferingDto, UpdateOfferingDto } from '@myideaswork/common/dtos';
import { ApprovalState } from '@myideaswork/common/enums';
import { Offering, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/authentication';
import { getMyIntroductions } from 'src/app/state/introductions/introductions.actions';
import {
   batchSaveOffering,
   clearOfferingToCreate,
   getMyOfferings,
   openAddOfferingDialog,
} from 'src/app/state/offerings/offerings.actions';
import {
   selectAllMyOfferings,
   selectOfferingsToCreate,
} from 'src/app/state/offerings/offerings.selector';

@Component({
   selector: 'my-info-page',
   templateUrl: './my-info-page.component.html',
   styleUrls: ['./my-info-page.component.scss'],
})
export class MyInfoPageComponent implements OnDestroy, OnInit {
   allMyOfferings$: Observable<Offering[]>;

   currentUser$: Observable<User | null>;

   currentUser: User | null = null;

   preservedOfferings: Offering[] = [];

   allMyOfferings: Offering[] = [];

   offeringsToCreate$: Observable<Offering[]>;

   selectedOffering: Offering | null = null;

   offeringsToDelete = new Set<number>();

   offeringsToCreate: Offering[] = [];

   offeringsToUpdate: Offering[] = [];

   get hasChanges(): boolean {
      return (
         this.offeringsToCreate.length > 0 ||
         this.offeringsToDelete.size > 0 ||
         this.offeringsToUpdate.length > 0
      );
   }

   private destroyed$ = new Subject<void>();

   constructor(private store: Store) {
      this.store.dispatch(getMyOfferings());
      this.store.dispatch(getMyIntroductions());
      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
         this.currentUser = currentUser;
      });
      this.allMyOfferings$ = this.store.select(selectAllMyOfferings);
      this.allMyOfferings$.pipe(takeUntil(this.destroyed$)).subscribe((allMyOfferings) => {
         this.preservedOfferings = [...allMyOfferings];
         this.allMyOfferings = [...allMyOfferings];
         if (!this.selectedOffering) {
            this.selectedOffering = this.allMyOfferings[0];
         } else {
            this.selectedOffering =
               this.allMyOfferings.find(
                  (o) => o.offeringId === this.selectedOffering?.offeringId,
               ) ?? this.allMyOfferings[0];
         }
      });
      this.offeringsToCreate$ = this.store.select(selectOfferingsToCreate);
      this.offeringsToCreate$.pipe(takeUntil(this.destroyed$)).subscribe((offeringsToCreate) => {
         this.offeringsToCreate = offeringsToCreate;
      });
   }

   ngOnInit(): void {
      this.selectedOffering = this.allMyOfferings[0];
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

   onDeleteOffering(e: MouseEvent, offering: Offering): void {
      e.stopPropagation();
      if (offering.offeringId) this.offeringsToDelete.add(offering.offeringId);
   }

   isOfferingMarkedForDelete(offering: Offering): boolean {
      return !!offering.offeringId && this.offeringsToDelete.has(offering.offeringId);
   }

   handleCancelChanges(): void {
      this.offeringsToDelete.clear();
      this.offeringsToUpdate = [];
      this.allMyOfferings = [...this.preservedOfferings];

      this.selectedOffering =
         this.allMyOfferings.find((o) => o.offeringId === this.selectedOffering?.offeringId) ??
         this.allMyOfferings[0];

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
               itemsToUpdate: this.offeringsToUpdate as UpdateOfferingDto[],
               itemsToDeleteIds: Array.from(this.offeringsToDelete).filter((id) => id > 0),
            },
         }),
      );
      this.offeringsToDelete.clear();
      this.offeringsToUpdate = [];
   }

   handleSelectedOfferingFormChange(offering: Offering) {
      const offeringIsNotYetCreated = this.offeringsToCreate.some(
         (o) => o.offeringId === this.selectedOffering?.offeringId,
      );

      if (offeringIsNotYetCreated) {
         this.offeringsToCreate = this.updateOfferingArrayOnChange(
            this.offeringsToCreate,
            offering,
         );
      } else {
         this.allMyOfferings = this.updateOfferingArrayOnChange(this.allMyOfferings, offering);

         const alreadyUpdatedOffering = this.offeringsToUpdate.some(
            (o) => o.offeringId === this.selectedOffering?.offeringId,
         );
         if (alreadyUpdatedOffering) {
            this.offeringsToUpdate = this.updateOfferingArrayOnChange(
               this.offeringsToUpdate,
               offering,
            );
         } else {
            this.offeringsToUpdate.push({ ...this.selectedOffering, ...offering });
         }
      }

      this.selectedOffering = { ...this.selectedOffering, ...offering };
   }

   handleUndeleteSelectedForm() {
      if (this.selectedOffering?.offeringId)
         this.offeringsToDelete.delete(this.selectedOffering.offeringId);
   }

   private updateOfferingArrayOnChange(array: Offering[], offering: Offering) {
      return array.map((o) => {
         if (o.offeringId === this.selectedOffering?.offeringId) {
            return { ...o, ...offering };
         }
         return o;
      });
   }
}
