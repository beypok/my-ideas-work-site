import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfferingsSearchSidebarModule } from 'src/app/components/offerings-search-sidebar/offerings-search-sidebar.module';
import { OfferingsModule } from 'src/app/state/offerings/offerings.module';
import { OfferingsPageComponent } from './offerings-page.component';

@NgModule({
   declarations: [OfferingsPageComponent],
   imports: [CommonModule, OfferingsModule, OfferingsSearchSidebarModule],
   exports: [OfferingsPageComponent],
})
export class OfferingsPageModule {}
