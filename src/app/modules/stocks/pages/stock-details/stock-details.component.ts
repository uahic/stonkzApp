import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import {  map, filter,  take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


import * as Highcharts from 'highcharts';
import * as moment from 'moment'

import HC_stock from 'highcharts/modules/stock';
HC_stock(Highcharts);

@UntilDestroy()
@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartRef!: Highcharts.Chart;
  chartConstructor = 'chart';
  updateFlag = false;
  oneToOneFlag = true;
  runOutsideAngularFlag = false;


  stockData$!: Observable<any>;
  activeLinkIndex$ = new BehaviorSubject<number>(0);
  symbol$!: Observable<string>;

  linkLabels = [
    'Intraday',
    '1 Week',
    '1 Month',
    // '6 Months',
    '1 Year',
    // '5 Years',
    'Max.'
  ];

  chartOptions!: Highcharts.Options;

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    // this.stockData$ =
    //   combineLatest(this.symbol$, this.activeLinkIndex$)
    //     .pipe(
    //       switchMap(([symbol, index]) => {
    //         console.log('symbol: ', symbol)
    //         // if (!symbol) {
    //         symbol = 'IBM';
    //         // }
    //         switch (index) {
    //           // Intraday
    //           case 0:
    //             // return this.stockAPI.getTimeSeries(symbol, TIME_SERIES_FUNCTION.INTRADAY, TIME_SERIES_INTRADAY_INTERVAL.FIVE_MINUTES);
    //             return this.stockAPI.getStockCandles(symbol, 1, 1572651390, 1572910590);
    //           // 1 Week
    //           case 1:
    //             // return this.stockAPI.getTimeSeries(symbol, TIME_SERIES_FUNCTION.WEEKLY);
    //             break;
    //           // 1 Month
    //           case 2:
    //             // return this.stockAPI.getTimeSeries(symbol, TIME_SERIES_FUNCTION.MONTHLY);
    //             break;
    //           // 1 Year
    //           case 3:
    //             return EMPTY;
    //           //  Max.
    //           case 4:
    //             return EMPTY;
    //         }
    //       })
    //     );
    this.route.params
      .pipe(
        filter(params => !!params['symbol']),
        map(params => params['symbol']),
        take(1),
        untilDestroyed(this)
      )
      .subscribe((symbol: string) => {
        this.chartOptions = {
          title: {
            text: `${symbol} Stock Price`
          },
          chart: {
            type: 'area',
            zoomType: 'x',
            events: {
              load: () => {
                // const d = new Date();
                // const yesterday = Math.round(d.setDate(d.getDate() - 1) / 1000);
                // const morning = Math.round(new Date().setHours(0, 0, 0, 0)/1000);
                // const end = Math.round(Date.now() / 1000);
                const start = moment().startOf('month').unix();
                const end = moment().unix();
                console.log(start, end)
                // this.stockAPI.getStockCandles('AAPL', TIME_RESOLUTION.ONE_MINUTE, start, end)
                //   .pipe(
                //     untilDestroyed(this)
                //   )
                //   .subscribe(data => {
                //     console.log(data)
                //     const chartData = data.map(val => [val.timestamp.getTime(), val.open, val.high, val.low, val.close]);
                //     // console.log(chartData)
                //     this.chartRef.addSeries({
                //       type: 'area',
                //       name: symbol,
                //       data: chartData,
                //       dataGrouping: {
                //         enabled: false
                //       }
                //     }, false);

                //     this.chartRef.update({
                //       navigator: {
                //         series: {
                //           data: chartData
                //         }
                //       }
                //     });
                //   })
              }
            }
          },
          navigator: {
            adaptToUpdatedData: false
          },
          scrollbar: {
            liveRedraw: false
          },
          rangeSelector: {
            buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
            }, {
              type: 'day',
              count: 1,
              text: '1d'
            },
            {
              type: 'month',
              count: 1,
              text: '1m'
            },
            // {
            //   type: 'year',
            //   count: 1,
            //   text: '1y'
            // },
            {
              type: 'all',
              text: 'ALL'
            }],
            inputEnabled: false,
            selected: 2
          },
          xAxis: {
            type: 'datetime',
            minRange: 3600 * 1000 // one houir
          },
          // time: {
          //   timezone: 'Europe/London'
          // }
          // xAxis: {
          //   events: {
          //     afterSetExtremes: (event) => {
          //       console.log('setting extremes..')
          //       this.chartRef.showLoading('Loading ...');
          //       const dateNow = Math.round(Date.now()/1000);
          //       this.stockAPI.getStockCandles('AAPL', 1, event.min, event.max)
          //         .pipe(untilDestroyed(this))
          //         .subscribe(data => {
          //           const chartData = data.map((val, i) => [val.timestamp, val.open, val.high, val.low, val.close]);
          //           // const chartData: Highcharts.PointOptionsType[] =
          //           this.chartRef.series[0].setData(chartData);
          //           this.chartRef.hideLoading();
          //         });
          //     }
          //   },
          // minRange: 3600 * 1000 // one houir
          // },
          // yAxis: {
          //   floor: 0
          // }
        };
      })



  }

  chartCallback: Highcharts.ChartCallbackFunction = (chartRef) => {
    this.chartRef = chartRef;
  }

  handleTabClickEvent(index: number): void {
    this.activeLinkIndex$.next(index);
  }

  updateChart(): void {
    this.updateFlag = true;
  }

}
