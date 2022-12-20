import {
   Component,
   EventEmitter,
   Input,
   OnDestroy,
   Output,
   ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Collateral, Continent, ProjectPhase, Terms } from '@myideaswork/common/enums';
import { User } from '@myideaswork/common/interfaces';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnumMapperService } from 'src/app/services/enum-mapper/enum-mapper.service';
import { selectCurrentUser } from 'src/app/state/authentication';

export type OfferingsSearchSidebarTab = 'Advertisers' | 'Investors';

export interface OfferingsSearchSidebarForm {
   searchText: FormControl<string | null>;
   continent: FormControl<Continent[] | null>;
   projectPhase: FormControl<ProjectPhase[] | null>;
   collateral: FormControl<Collateral[] | null>;
   amountRangeStart: FormControl<number | null>;
   amountRangeEnd: FormControl<number | null>;
   terms: FormControl<Terms[] | null>;
}

@Component({
   encapsulation: ViewEncapsulation.None,
   selector: 'offerings-search-sidebar',
   templateUrl: './offerings-search-sidebar.component.html',
   styleUrls: ['./offerings-search-sidebar.component.scss'],
})
export class OfferingsSearchSidebarComponent implements OnDestroy {
   @Input('selectedTab') selectedTab: OfferingsSearchSidebarTab = 'Advertisers';

   @Input('form') form: FormGroup<OfferingsSearchSidebarForm> | null = null;

   @Output() selectedTabChange = new EventEmitter<OfferingsSearchSidebarTab>();

   @Output() search = new EventEmitter<void>();

   @Output() clear = new EventEmitter<void>();

   currentUser: User | null = null;

   private currentUser$: Observable<User | null>;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, public enumMapper: EnumMapperService) {
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

   handleClearSearch(e: MouseEvent) {
      e.stopPropagation();
      this.clear.emit();
   }

   handleFormSubmit(e: SubmitEvent) {
      e.stopPropagation();
      this.search.emit();
   }
}
