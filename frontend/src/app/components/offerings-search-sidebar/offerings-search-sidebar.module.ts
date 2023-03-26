import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { OfferingsSearchSidebarComponent } from './offerings-search-sidebar.component';

@NgModule({
   declarations: [OfferingsSearchSidebarComponent],
   imports: [
      CommonModule,
      RouterModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatOptionModule,
      MatSelectModule,
   ],
   exports: [OfferingsSearchSidebarComponent],
})
export class OfferingsSearchSidebarModule {}
