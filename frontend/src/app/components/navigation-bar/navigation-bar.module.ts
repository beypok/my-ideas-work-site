import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar.component';

@NgModule({
   declarations: [NavigationBarComponent],
   imports: [CommonModule, RouterModule, MatMenuModule, MatIconModule, MatButtonModule],
   exports: [NavigationBarComponent],
})
export class NavigationBarModule {}
