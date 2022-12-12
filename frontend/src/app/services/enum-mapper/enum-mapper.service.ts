import { Injectable } from '@angular/core';
import {
   AccountType,
   Collateral,
   Continent,
   Location,
   OfferingType,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';

@Injectable({
   providedIn: 'root',
})
export class EnumMapperService {
   _accountType = AccountType;
   _offeringType = OfferingType;
   _continents = Continent;
   _continentKeys = Object.keys(Continent);
   _locations = Location;
   _locationKeys = Object.keys(Location);
   _projectPhases = ProjectPhase;
   _projectPhaseKeys = Object.keys(ProjectPhase);
   _terms = Terms;
   _termsKeys = Object.keys(Terms);
   _collateral = Collateral;
   _collateralKeys = Object.keys(Collateral);

   constructor() {}

   // Enum mapping methods
   mapEnumKeyToValue(key: string, e: Object) {
      return e[key as keyof typeof e];
   }
}
