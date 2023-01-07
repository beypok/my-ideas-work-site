import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApprovalState } from '@myideaswork/common/enums';
import { Introduction, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/authentication';
import {
   clearIntroductionToCreate,
   getMyIntroductions,
   openAddIntroductionDialog,
} from 'src/app/state/introductions/introductions.actions';
import {
   selectAllMyIntroductions,
   selectIntroductionsToCreate,
} from 'src/app/state/introductions/introductions.selector';

@Component({
   selector: 'my-introductions-page',
   templateUrl: './my-introductions-page.component.html',
   styleUrls: ['./my-introductions-page.component.scss'],
})
export class MyIntroductionsPageComponent implements OnDestroy, OnInit {
   allMyIntroductions$: Observable<Introduction[]>;

   currentUser$: Observable<User | null>;

   currentUser: User | null = null;

   preservedIntroductions: Introduction[] = [];

   allMyIntroductions: Introduction[] = [];

   introductionsToCreate$: Observable<Introduction[]>;

   selectedIntroduction: Introduction | null = null;

   introductionsToDelete = new Set<number>();

   introductionsToCreate: Introduction[] = [];

   introductionsToUpdate: Introduction[] = [];

   get hasChanges(): boolean {
      return (
         this.introductionsToCreate.length > 0 ||
         this.introductionsToDelete.size > 0 ||
         this.introductionsToUpdate.length > 0
      );
   }

   private destroyed$ = new Subject<void>();

   constructor(private store: Store) {
      this.store.dispatch(getMyIntroductions());
      this.store.dispatch(getMyIntroductions());
      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
         this.currentUser = currentUser;
      });
      this.allMyIntroductions$ = this.store.select(selectAllMyIntroductions);
      this.allMyIntroductions$.pipe(takeUntil(this.destroyed$)).subscribe((allMyIntroductions) => {
         this.preservedIntroductions = [...allMyIntroductions];
         this.allMyIntroductions = [...allMyIntroductions];
         if (!this.selectedIntroduction) {
            this.selectedIntroduction = this.allMyIntroductions[0];
         } else {
            this.selectedIntroduction =
               this.allMyIntroductions.find(
                  (o) => o.introductionId === this.selectedIntroduction?.introductionId,
               ) ?? this.allMyIntroductions[0];
         }
      });
      this.introductionsToCreate$ = this.store.select(selectIntroductionsToCreate);
      this.introductionsToCreate$
         .pipe(takeUntil(this.destroyed$))
         .subscribe((introductionsToCreate) => {
            this.introductionsToCreate = introductionsToCreate;
         });
   }

   ngOnInit(): void {
      this.selectedIntroduction = this.allMyIntroductions[0];
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   addIntroductionClick(e: MouseEvent): void {
      e.stopPropagation();
      this.store.dispatch(openAddIntroductionDialog());
   }

   getIntroductionApprovalStateClass(introduction: Introduction): string {
      if (introduction.approvalState === ApprovalState.Approved) {
         return 'approved';
      } else if (introduction.approvalState === ApprovalState.Denied) {
         return 'denied';
      }
      return 'pending';
   }

   getIntroductionApprovalStateText(introduction: Introduction): string {
      if (introduction.approvalState === ApprovalState.Approved) {
         return 'Approved';
      } else if (introduction.approvalState === ApprovalState.Denied) {
         return 'Denied';
      }
      return '* This introduction is still awaiting approval';
   }

   onSelectIntroduction(introduction: Introduction): void {
      this.selectedIntroduction = introduction;
   }

   onDeleteIntroduction(e: MouseEvent, introduction: Introduction): void {
      e.stopPropagation();
      if (introduction.introductionId) this.introductionsToDelete.add(introduction.introductionId);
   }

   isIntroductionMarkedForDelete(introduction: Introduction): boolean {
      return (
         !!introduction.introductionId &&
         this.introductionsToDelete.has(introduction.introductionId)
      );
   }

   handleCancelChanges(): void {
      this.introductionsToDelete.clear();
      this.introductionsToUpdate = [];
      this.allMyIntroductions = [...this.preservedIntroductions];

      this.selectedIntroduction =
         this.allMyIntroductions.find(
            (o) => o.introductionId === this.selectedIntroduction?.introductionId,
         ) ?? this.allMyIntroductions[0];

      this.store.dispatch(clearIntroductionToCreate());
   }

   handleSubmitChanges(): void {
      this.introductionsToDelete.clear();
      this.introductionsToUpdate = [];
   }

   handleSelectedIntroductionFormChange(introduction: Introduction) {
      const introductionIsNotYetCreated = this.introductionsToCreate.some(
         (o) => o.introductionId === this.selectedIntroduction?.introductionId,
      );

      if (introductionIsNotYetCreated) {
         this.introductionsToCreate = this.updateIntroductionArrayOnChange(
            this.introductionsToCreate,
            introduction,
         );
      } else {
         this.allMyIntroductions = this.updateIntroductionArrayOnChange(
            this.allMyIntroductions,
            introduction,
         );

         const alreadyUpdatedIntroduction = this.introductionsToUpdate.some(
            (o) => o.introductionId === this.selectedIntroduction?.introductionId,
         );
         if (alreadyUpdatedIntroduction) {
            this.introductionsToUpdate = this.updateIntroductionArrayOnChange(
               this.introductionsToUpdate,
               introduction,
            );
         } else {
            this.introductionsToUpdate.push({ ...this.selectedIntroduction, ...introduction });
         }
      }

      this.selectedIntroduction = { ...this.selectedIntroduction, ...introduction };
   }

   handleUndeleteSelectedForm() {
      if (this.selectedIntroduction?.introductionId)
         this.introductionsToDelete.delete(this.selectedIntroduction.introductionId);
   }

   private updateIntroductionArrayOnChange(array: Introduction[], introduction: Introduction) {
      return array.map((o) => {
         if (o.introductionId === this.selectedIntroduction?.introductionId) {
            return { ...o, ...introduction };
         }
         return o;
      });
   }
}
