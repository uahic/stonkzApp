import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [LandingPageComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    LayoutModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule
  ],
  exports: [
    LandingPageComponent,
    DashboardComponent
  ]
})
export class CoreModule { }
