import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './pages/stock-list/stock-list.component';
import { StockDetailsComponent } from './pages/stock-details/stock-details.component';

const routes: Routes = [
  {
    path: '',
    component: StockListComponent,
    children: [{
      path: ':symbol',
      component: StockDetailsComponent
    }]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
