import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountType } from '@myideaswork/common/enums';
import { Offering } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
   OfferingsSearchSidebarForm,
   OfferingsSearchSidebarTab,
} from 'src/app/components/offerings-search-sidebar/offerings-search-sidebar.component';
import { getApprovedOfferings } from 'src/app/state/offerings/offerings.actions';
import { selectApprovedOfferings } from 'src/app/state/offerings/offerings.selector';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   selector: 'offerings-page',
   templateUrl: './offerings-page.component.html',
   styleUrls: ['./offerings-page.component.scss'],
})
export class OfferingsPageComponent implements OnDestroy, OnInit {
   selectedTab: OfferingsSearchSidebarTab = 'Advertisers';

   approvedOfferings$: Observable<Offering[]>;

   approvedOfferings: Offering[] = [];

   searchForm: FormGroup<OfferingsSearchSidebarForm> | null = null;

   get offeringsToShow(): Offering[] {
      return this.approvedOfferings.filter((o) => this.shouldShowOffering(o));
   }

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private cd: ChangeDetectorRef, private fb: FormBuilder) {
      this.store.dispatch(getApprovedOfferings());
      this.approvedOfferings$ = this.store.select(selectApprovedOfferings);
      this.initSearchForm();
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

   handleSearch(): void {
      console.log(this.searchForm);
   }

   handleClearSearch(): void {
      this.initSearchForm();
   }

   private initSearchForm() {
      this.searchForm = this.fb.group<OfferingsSearchSidebarForm>({
         searchText: new FormControl(null),
         location: new FormControl(null),
         projectPhase: new FormControl(null),
         collateral: new FormControl(null),
         amountRangeStart: new FormControl(null),
         amountRangeEnd: new FormControl(null),
         terms: new FormControl(null),
      });
   }

   private shouldShowOffering(o: Offering): boolean {
      if (this.selectedTab === 'Advertisers' && o.user?.accountType !== AccountType.Advertiser)
         return false;
      if (this.selectedTab === 'Investors' && o.user?.accountType !== AccountType.Investor)
         return false;

      const {
         searchText,
         location,
         projectPhase,
         collateral,
         amountRangeStart,
         amountRangeEnd,
         terms,
      } = this.searchForm?.getRawValue() ?? {};

      if (searchText && !o.name?.includes(searchText)) return false;
      if (location && !location.some((l) => l === o.location)) return false;
      if (projectPhase && !projectPhase.some((p) => p === o.projectPhase)) return false;
      if (collateral && !collateral.some((c) => c === o.collateral)) return false;
      if (terms && !terms.some((t) => t === o.terms)) return false;

      if (o.user?.accountType === AccountType.Advertiser) {
         if (amountRangeStart && o.amountRequested && o.amountRequested < amountRangeStart)
            return false;
         if (amountRangeEnd && o.amountRequested && o.amountRequested > amountRangeEnd)
            return false;
      } else {
         if (amountRangeStart && o.amountRangeStart !== amountRangeStart) return false;
         if (amountRangeEnd && o.amountRangeEnd !== amountRangeEnd) return false;
      }

      return true;
   }
}
