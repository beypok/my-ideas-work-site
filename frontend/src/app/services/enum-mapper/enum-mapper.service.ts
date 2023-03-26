import { Injectable } from '@angular/core';
import {
   AccountType,
   Collateral,
   Continent,
   Industries,
   IndustriesFocus,
   InvestorOfferingType,
   Location,
   ProjectPhase,
   Terms,
} from '@myideaswork/common/enums';

@Injectable({
   providedIn: 'root',
})
export class EnumMapperService {
   _accountType = AccountType;
   _investorOfferingType = InvestorOfferingType;
   _industries = Industries;
   _industriesKeys = Object.keys(Industries);
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
   _industriesFocus = IndustriesFocus;
   _industriesFocusKeys = Object.keys(IndustriesFocus);

   constructor() {}

   // Enum mapping methods
   mapEnumKeyToValue(key: string, e: Object) {
      return e[key as keyof typeof e];
   }
}
