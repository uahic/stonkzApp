import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataProviderService } from '../../../dataprovider/data-provider.service';

// import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts/highstock';
// import HC_stock from 'highcharts/modules/stock';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest, of, EMPTY } from 'rxjs';
import { Candles } from '../../../dataprovider/candle.model';

// HC_stock(Highcharts);

import * as moment from 'moment';
import { Resolution } from '../../../dataprovider/data-provider.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

const WINDOW_RESOLUTION_MAP = new Map<string, Resolution>([
  ['1D', '5'],
  ['5D', '30'],
  ['1M', 'D'],
  ['6M', 'D'],
  ['1Y', 'W'],
  ['5Y', 'M'],
  ['Max', 'M']
]);

const WINDOW_LABEL_MAP = new Map<string, string>([
  ['1D', 'Intraday'],
  ['5D', '5 days'],
  ['1M', '1 month'],
  ['6M', '6 months'],
  ['1Y', '1 Year'],
  ['6Y', '5 years'],
  ['Max', 'Max.']
]);

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss']
})
export class QuoteDetailComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartRef!: Highcharts.Chart;
  chartConstructor = '';
  updateFlag = false;
  oneToOneFlag = true;
  runOutsideAngularFlag = false;
  chartOptions: Highcharts.Options;

  intervals = WINDOW_LABEL_MAP;
  activeInterval = '1D';
  symbol = '';

  constructor(private route: ActivatedRoute, private dataprovider: DataProviderService, private snackbar: MatSnackBar) {
    this.route.params
      .pipe(
        filter(params => 'symbol' in params),
        tap(params => this.symbol = params['symbol']),
        switchMap(params => combineLatest([of([params]), this.fetchData(params['symbol'])]))
      )
      .subscribe(([params, candles]) => {
        this.setTitle(params['symbol']);
        this.setData(candles);
        this.drawChart();
      });
  }

  ngOnInit(): void {
    this.chartOptions = {
      title: {
        text: ''
      },
    };
    this.chartOptions.xAxis = {
      type: 'datetime'
    };
  }


  changeInterval(intervalKey: string): void {
    this.activeInterval = intervalKey;
    const window = intervalKey;
    this.fetchData(this.symbol, window).subscribe(candle => {
      this.setData(candle);
      this.drawChart();
    });
  }

  chartCallback: Highcharts.ChartCallbackFunction = (chartRef) => {
    this.chartRef = chartRef;
  }

  fetchData(symbol: string, window = '1D'): Observable<Candles> {

    const resolution = WINDOW_RESOLUTION_MAP.get(window);
    let from = 0;
    if (window === 'Max') {
      from = moment().subtract(20, 'years').unix();
    } else if (window === '5D') {
      from = moment().subtract(1, 'week').unix();
    } else if (window === '1M') {
      from = moment().subtract(1, 'month').unix();
    } else if (window === '6M') {
      from = moment().subtract(6, 'months').unix();
    } else if (window === '1Y') {
      from = moment().subtract(1, 'year').unix();
    } else if (window === '5Y') {
      from = moment().subtract(5, 'years').unix();
    } else {
      if (moment().day() > 5) {
        from = moment().startOf('day').day(-2).unix();
      } else {
        from = moment().subtract(1, 'day').unix();
      }
    }
    const to = moment().unix();

    return this.dataprovider.getCandles(symbol, { from: from, to: to, resolution: resolution })
      .pipe(
        catchError(_err => {
          this.openSnackbar('Cant fetch Data. Possibly the free dataprovider plan does not include this query')
          return EMPTY;
        })
      );
  }

  // new Date(data.t[index] * 1000).toLocaleDateString()
  // private getUnixTime(date: Date) {
  //   return date.getTime() / 1000 | 0;
  // }

  openSnackbar(message: string): void {
    this.snackbar.open(message, 'Close');
  }

  setTitle(symbol: string): void {
    this.chartOptions.title.text = symbol;
  }

  private convertData(candles: Candles): [number, number][] {
    return zip(candles.time, candles.close);
  }

  setData(candles: Candles): void {
    if (candles.status === 'no_data') {
      console.error('no data found');
      return;
    }
    this.chartOptions.series = [
      {
        name: this.symbol,
        data: this.convertData(candles),
        type: 'area',
        threshold: null,
        tooltip: {
          valueDecimals: 2
        },
      }
    ];
    this.chartOptions.navigator = {
      enabled: true
    }

    this.chartOptions.xAxis = {
      scrollbar: {
        enabled: true
      },
      type: 'datetime',

    }
    this.chartOptions.rangeSelector = {
      enabled: true,
      inputEnabled: false,
      labelStyle: {
        display: 'none'
      },
      buttonPosition: {
        align: 'left'
      },
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d'
        },
        {
          type: 'day',
          count: 5,
          text: '5d'
        },
        {
          type: 'month',
          count: 1,
          text: '1m'
        },
        {
          type: 'month',
          count: 6,
          text: '1y'
        },
        {
          type: 'year',
          count: 1,
          text: '1y'
        },
        {
          type: 'year',
          count: 5,
          text: '5y'
        }
      ]
    }

    this.chartOptions.responsive = {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 300
          },
          subtitle: {
            text: null
          },
          navigator: {
            enabled: true
          }
        }
      }]
    }
  }

  drawChart(): void {
    this.updateFlag = true;
  }


}
