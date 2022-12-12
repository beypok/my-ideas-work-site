import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
} from '@angular/core';
import { AccountType } from '@myideaswork/common/enums';
import { Offering } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OfferingsSearchSidebarTab } from 'src/app/components/offerings-search-sidebar/offerings-search-sidebar.component';
import { getApprovedOfferings } from 'src/app/state/offerings/offerings.actions';
import { selectApprovedOfferings } from 'src/app/state/offerings/offerings.selector';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   selector: 'offerings-page',
   templateUrl: './offerings-page.component.html',
   styleUrls: ['./offerings-page.component.scss'],
})
export class OfferingsPageComponent implements OnDestroy, OnInit {
   selectedTab: OfferingsSearchSidebarTab = 'Advertisers';

   approvedOfferings$: Observable<Offering[]>;

   approvedOfferings: Offering[] = [];

   get offeringsToShow(): Offering[] {
      return this.approvedOfferings.filter((o) => {
         return (
            (this.selectedTab === 'Advertisers' &&
               o.user?.accountType === AccountType.Advertiser) ||
            (this.selectedTab === 'Investors' && o.user?.accountType === AccountType.Investor)
         );
      });
   }

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private cd: ChangeDetectorRef) {
      this.store.dispatch(getApprovedOfferings());
      this.approvedOfferings$ = this.store.select(selectApprovedOfferings);
   }

   ngOnInit(): void {
      this.approvedOfferings$.pipe(takeUntil(this.destroyed$)).subscribe((approvedOfferings) => {
         this.approvedOfferings = [...approvedOfferings];
         this.cd.detectChanges();
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSelectedTabChange(selectedTab: OfferingsSearchSidebarTab) {
      this.selectedTab = selectedTab;
   }
}
