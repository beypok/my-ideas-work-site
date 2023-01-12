import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   OnDestroy,
   OnInit,
   ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
   AccountType,
   AFRICA_LOCATIONS,
   ASIA_LOCATIONS,
   Continent,
   EUROPE_LOCATIONS,
   Location,
   NORTH_AMERICA_LOCATIONS,
   OCEANIA_LOCATIONS,
   SOUTH_AMERICA_LOCATIONS,
} from '@myideaswork/common/enums';
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

   offeringsToShow: Offering[] = [];

   private destroyed$ = new Subject<void>();

   constructor(
      private store: Store,
      private cd: ChangeDetectorRef,
      private fb: FormBuilder,
      private router: Router,
   ) {
      this.store.dispatch(getApprovedOfferings());
      this.approvedOfferings$ = this.store.select(selectApprovedOfferings);
      this.initSearchForm();
   }

   ngOnInit(): void {
      this.approvedOfferings$.pipe(takeUntil(this.destroyed$)).subscribe((approvedOfferings) => {
         this.approvedOfferings = [...approvedOfferings];
         this.offeringsToShow = this.approvedOfferings.filter((o) => this.shouldShowOffering(o));
         this.cd.detectChanges();
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   onSelectedTabChange(selectedTab: OfferingsSearchSidebarTab) {
      this.selectedTab = selectedTab;
      this.offeringsToShow = this.approvedOfferings.filter((o) => this.shouldShowOffering(o));
   }

   handleSearch(): void {
      this.offeringsToShow = this.approvedOfferings.filter((o) => this.shouldShowOffering(o));
   }

   handleClearSearch(): void {
      this.initSearchForm();
      this.offeringsToShow = this.approvedOfferings.filter((o) => this.shouldShowOffering(o));
   }

   handleViewMore(offering: Offering) {
      this.router.navigateByUrl(`/offering/${offering.offeringId}`);
   }

   private initSearchForm() {
      this.searchForm = this.fb.group<OfferingsSearchSidebarForm>({
         searchText: new FormControl(null),
         continent: new FormControl(null),
         industries: new FormControl(null),
         investorOfferingTypes: new FormControl(null),
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
         continent,
         projectPhase,
         collateral,
         amountRangeStart,
         amountRangeEnd,
         terms,
         industries,
         investorOfferingTypes,
      } = this.searchForm?.getRawValue() ?? {};

      if (searchText && !o.name?.includes(searchText)) return false;
      if (
         continent &&
         continent.length > 0 &&
         !continent.some((c) => c === this.getLocationContinent(o.location!))
      )
         return false;
      if (
         projectPhase &&
         projectPhase.length > 0 &&
         !projectPhase.some((p) => p === o.projectPhase)
      )
         return false;
      if (collateral && collateral.length > 0 && !collateral.some((c) => c === o.collateral))
         return false;
      if (terms && terms.length > 0 && !terms.some((t) => t === o.terms)) return false;

      if (o.user?.accountType === AccountType.Advertiser) {
         if (amountRangeStart && o.amountRequested && o.amountRequested < amountRangeStart)
            return false;
         if (amountRangeEnd && o.amountRequested && o.amountRequested > amountRangeEnd)
            return false;
         if (industries && industries.length > 0 && !industries.some((t) => t === o.industry))
            return false;
      } else {
         if (amountRangeStart && o.amountRangeStart !== amountRangeStart) return false;
         if (amountRangeEnd && o.amountRangeEnd !== amountRangeEnd) return false;
         if (
            investorOfferingTypes &&
            investorOfferingTypes.length > 0 &&
            !investorOfferingTypes.some((t) => t === o.investorOfferingType)
         )
            return false;
      }

      return true;
   }

   private getLocationNames(): Map<string, string> {
      const locationNames = new Map<string, string>();

      for (const [key, value] of Object.entries(Location)) {
         locationNames.set(value, key);
      }

      return locationNames;
   }

   private getLocationContinent(location: Location): Continent {
      const locationNames = this.getLocationNames();
      const locationName = locationNames.get(location);
      if (locationName) {
         if (EUROPE_LOCATIONS.some((l) => l === locationName)) return Continent.Europe;
         if (ASIA_LOCATIONS.some((l) => l === locationName)) return Continent.Asia;
         if (AFRICA_LOCATIONS.some((l) => l === locationName)) return Continent.Africa;
         if (NORTH_AMERICA_LOCATIONS.some((l) => l === locationName))
            return Continent['North America'];
         if (OCEANIA_LOCATIONS.some((l) => l === locationName)) return Continent.Oceania;
         if (SOUTH_AMERICA_LOCATIONS.some((l) => l === locationName))
            return Continent['South America'];
      }

      return Continent.Antartica;
   }
}
