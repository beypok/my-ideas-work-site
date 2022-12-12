import {
   Component,
   EventEmitter,
   Input,
   OnDestroy,
   Output,
   ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Collateral, Location, ProjectPhase, Terms } from '@myideaswork/common/enums';
import { User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/authentication';

export type OfferingsSearchSidebarTab = 'Advertisers' | 'Investors';

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'offerings-search-sidebar',
   templateUrl: './offerings-search-sidebar.component.html',
   styleUrls: ['./offerings-search-sidebar.component.scss'],
})
export class OfferingsSearchSidebarComponent implements OnDestroy {
   @Input('selectedTab') selectedTab: OfferingsSearchSidebarTab = 'Advertisers';

   @Output() selectedTabChange = new EventEmitter<OfferingsSearchSidebarTab>();

   form: FormGroup;

   // Enums
   _locations = Location;
   _locationKeys = Object.keys(Location);
   _projectPhases = ProjectPhase;
   _projectPhaseKeys = Object.keys(ProjectPhase);
   _terms = Terms;
   _termsKeys = Object.keys(Terms);
   _collateral = Collateral;
   _collateralKeys = Object.keys(Collateral);

   currentUser: User | null = null;

   private currentUser$: Observable<User>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, private fb: FormBuilder) {
      this.form = this.fb.group({
         searchText: new FormControl(null),
         industry: new FormControl(null),
         location: new FormControl(null),
         projectPhase: new FormControl(null),
         collateral: new FormControl(null),
         amountRangeStart: new FormControl(null),
         amountRangeEnd: new FormControl(null),
         terms: new FormControl(null),
      });

      this.currentUser$ = this.store.select(selectCurrentUser);
      this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
         this.currentUser = user;
      });
   }

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   setSelectedTab(selectedTab: OfferingsSearchSidebarTab) {
      this.selectedTabChange.emit(selectedTab);
   }

   // Enum mapping methods
   mapEnumKeyToValue(key: string, e: Object) {
      return e[key as keyof typeof e];
   }
}
