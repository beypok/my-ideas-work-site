import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountType, ApprovalState } from '@myideaswork/common/enums';
import { Introduction, User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/authentication';
import {
   approveIntroduction,
   denyIntroduction,
   getMyIntroductions,
} from 'src/app/state/introductions/introductions.actions';
import { selectMyIntroductions } from 'src/app/state/introductions/introductions.selector';

@Component({
   selector: 'my-introductions-page',
   templateUrl: './my-introductions-page.component.html',
   styleUrls: ['./my-introductions-page.component.scss'],
})
export class MyIntroductionsPageComponent implements OnDestroy, OnInit {
   currentUser: User | null = null;

   allMyIntroductions: Introduction[] = [];

   receivedIntroductions: Introduction[] = [];

   sentIntroductions: Introduction[] = [];

   selectedIntroduction: Introduction | null = null;

   get isSelectedIntroductionReceived(): boolean {
      return (
         this.selectedIntroduction?.receiveUser?.id === this.currentUser?.id &&
         this.selectedIntroduction?.createUser?.id !== this.currentUser?.id
      );
   }

   get isSelectedIntroductionPending(): boolean {
      return this.selectedIntroduction?.approvalState === ApprovalState.Pending;
   }

   private allMyIntroductions$: Observable<Introduction[]>;

   private currentUser$: Observable<User | null>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store) {
      this.store.dispatch(getMyIntroductions());
      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
         this.currentUser = currentUser;
      });
      this.allMyIntroductions$ = this.store.select(selectMyIntroductions);
      this.allMyIntroductions$.pipe(takeUntil(this.destroyed$)).subscribe((allMyIntroductions) => {
         this.allMyIntroductions = [...allMyIntroductions];

         this.receivedIntroductions = this.allMyIntroductions.filter(
            (i) => i.receiveUser?.id === this.currentUser?.id,
         );
         this.sentIntroductions = this.allMyIntroductions.filter(
            (i) => i.createUser?.id === this.currentUser?.id,
         );

         const firstReceivedThenSent =
            this.receivedIntroductions.length > 0
               ? this.receivedIntroductions[0]
               : this.sentIntroductions[0];

         if (!this.selectedIntroduction) {
            this.selectedIntroduction = firstReceivedThenSent;
         } else {
            this.selectedIntroduction =
               this.allMyIntroductions.find(
                  (o) => o.introductionId === this.selectedIntroduction?.introductionId,
               ) ?? firstReceivedThenSent;
         }
      });
   }

   ngOnInit(): void {
      this.selectedIntroduction = this.allMyIntroductions[0];
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
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

   onApprove() {
      const shouldApprove =
         this.selectedIntroduction &&
         (this.currentUser?.accountType === AccountType.Investor ||
            window.confirm(
               'Do logic for telling user this costs $10 and accepting payment... Confirming represents payment successfully went through and approval should be finished on our end',
            ));

      if (shouldApprove)
         this.store.dispatch(approveIntroduction({ introduction: this.selectedIntroduction! }));
   }

   onDeny() {
      if (this.selectedIntroduction)
         this.store.dispatch(denyIntroduction({ introduction: this.selectedIntroduction }));
   }
}
