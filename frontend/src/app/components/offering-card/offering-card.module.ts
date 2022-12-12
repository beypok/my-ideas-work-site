import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OfferingCardComponent } from './offering-card.component';

@NgModule({
   declarations: [OfferingCardComponent],
   imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
   exports: [OfferingCardComponent],
})
export class OfferingCardModule {}
