import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OfferingFormModule } from 'src/app/components/offering-form/offering-form.module';
import { OfferingsModule } from 'src/app/state/offerings/offerings.module';
import { OfferingPageComponent } from './offering-page.component';

@NgModule({
   declarations: [OfferingPageComponent],
   imports: [CommonModule, OfferingsModule, OfferingFormModule, MatButtonModule],
   exports: [OfferingPageComponent],
})
export class OfferingPageModule {}
