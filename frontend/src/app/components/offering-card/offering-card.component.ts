import {
   ChangeDetectionStrategy,
   Component,
   Input,
   OnDestroy,
   ViewEncapsulation,
} from '@angular/core';
import {
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
import { Subject } from 'rxjs';
import { EnumMapperService } from 'src/app/services/enum-mapper/enum-mapper.service';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.None,
   selector: 'offering-card',
   templateUrl: './offering-card.component.html',
   styleUrls: ['./offering-card.component.scss'],
})
export class OfferingCardComponent implements OnDestroy {
   @Input('offering') offering: Offering | null = null;

   private destroyed$ = new Subject<void>();

   constructor(private store: Store, public enumMapper: EnumMapperService) {}

   ngOnDestroy(): void {
      this.destroyed$.next();
   }

   getLocationNames(): Map<string, string> {
      const locationNames = new Map<string, string>();

      for (const [key, value] of Object.entries(Location)) {
         locationNames.set(value, key);
      }

      return locationNames;
   }

   getLocationContinent(location: Location): Continent {
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
