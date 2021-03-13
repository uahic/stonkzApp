import { NgModule } from '@angular/core';
import { FredChartComponent } from './pages/fred-chart/fred-chart.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FredChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MacroRoutingModule { }
