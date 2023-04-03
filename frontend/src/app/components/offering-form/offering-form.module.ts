import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { OfferingsModule } from 'src/app/state/offerings/offerings.module';
import { OfferingFormComponent } from './offering-form.component';
import {IndustryModule} from "src/app/state/industry/industry.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ProjectPhaseModule} from "src/app/state/project-phase/project-phase.module";

@NgModule({
   declarations: [OfferingFormComponent],
   imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatOptionModule,
      OfferingsModule,
      IndustryModule,
      ProjectPhaseModule
   ],
   exports: [OfferingFormComponent],
})
export class OfferingFormModule {}
