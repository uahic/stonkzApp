import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MacroRoutingModule } from './macro-routing.module';
import { FredChartComponent } from './pages/fred-chart/fred-chart.component';


@NgModule({
  declarations: [FredChartComponent],
  imports: [
    CommonModule,
    MacroRoutingModule
  ]
})
export class MacroModule { }
