import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockDetailsComponent } from './pages/stock-details/stock-details.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { StockListComponent } from './pages/stock-list/stock-list.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { HighchartsChartModule } from 'highcharts-angular'

@NgModule({
  declarations: [StockDetailsComponent, StockListComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    StocksRoutingModule,
    HighchartsChartModule
  ],
  exports: [StockDetailsComponent],
  providers: []
})
export class StocksModule {
}
