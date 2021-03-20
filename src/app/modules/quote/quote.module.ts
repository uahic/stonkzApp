import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteMasterComponent } from './pages/quote-master/quote-master.component';
import { QuoteDetailComponent } from './pages/quote-detail/quote-detail.component';
import { DataproviderModule } from '../dataprovider/dataprovider.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [QuoteMasterComponent, QuoteDetailComponent],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    DataproviderModule,
    HighchartsChartModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class QuoteModule { }
