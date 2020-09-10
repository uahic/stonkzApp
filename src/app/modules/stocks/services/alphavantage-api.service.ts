import { StockAPIService, StockCandle, TIME_RESOLUTION } from './stock-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function getURLParams(resolution: TIME_RESOLUTION, symbol: string, APIKey: string): string {
  const APIEndpoint = `https://www.alphavantage.co/query?symbol=${symbol}&apikey=${APIKey}`;
  const INTRADAY = 'TIME_SERIES_INTRADAY';
  const DAILY = 'TIME_SERIES_DAILY';
  const WEEKLY = 'TIME_SERIES_WEEKLY';
  const MONTHLY = 'TIME_SERIES_MONTHLY';

  switch (resolution) {
    case TIME_RESOLUTION.ONE_MINUTE:
      return `${APIEndpoint}&function=${INTRADAY}&interval=1min`;
    case TIME_RESOLUTION.FIVE_MINUTES:
      return `${APIEndpoint}&function=${INTRADAY}&interval=5min`;
    case TIME_RESOLUTION.FIFTEEN_MINUTES:
      return `${APIEndpoint}&function=${INTRADAY}&interval=15min`;
    case TIME_RESOLUTION.THIRTHY_MINUTES:
      return `${APIEndpoint}&function=${INTRADAY}&interval=30min`;
    case TIME_RESOLUTION.SIXTY_MINUTES:
      return `${APIEndpoint}&function=${INTRADAY}&interval=60min`;
    case TIME_RESOLUTION.ONE_DAY:
      return `${APIEndpoint}&function=${DAILY}`;
    case TIME_RESOLUTION.ONE_WEEK:
      return `${APIEndpoint}&function=${WEEKLY}`;
    case TIME_RESOLUTION.ONE_MONTH:
      return `${APIEndpoint}&function=${MONTHLY}`;
    case TIME_RESOLUTION.ALL:
      return `${APIEndpoint}&function=${MONTHLY}_ADJUSTED`;
    default:
      return `${APIEndpoint}&function=${MONTHLY}_ADJUSTED`;
  }
}

interface SimpleCandleData {
  "1. open": string,
  "2. high": string,
  "3. low": string,
  "4. close": string,
  "5. volume": string,
}

interface MonthlyAdjustedTimeSeries {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Time Zone": string
  },
  "Monthly Adjusted Time Series": {
    [key: string]: {
      "1. open": string,
      "2. high": string,
      "3. low": string,
      "4. close": string,
      "5. adjusted close": string,
      "6. volume": string,
      "7. dividend amount": string
    }
  }
}

interface MonthlyTimeSeries {
  "Monthly Time Series": {
    [key: string]: SimpleCandleData
  }
}

interface WeeklyTimeSeries {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Time Zone": string
  },
  "Weekly Time Series": {
    [key: string]: SimpleCandleData
  }
}

interface DailyTimeSeries {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Output Size": string,
    "5. Time Zone": string
  },
  "Time Series (Daily)": {
    [key: string]: SimpleCandleData
  }
}

interface IntradayTimeSeries {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Interval": string,
    "5. Output Size": string,
    "6. Time Zone": string
  },
  "Time Series (1min)"?: {
    [key: string]: SimpleCandleData
  },
  "Time Series (5min)"?: {
    [key: string]: SimpleCandleData
  },
  "Time Series (15min)"?: {
    [key: string]: SimpleCandleData
  }
  "Time Series (30min)"?: {
    [key: string]: SimpleCandleData
  },
  "Time Series (60min)"?: {
    [key: string]: SimpleCandleData
  }
}

export class AlphavantageAPIService implements StockAPIService {

  constructor(private APIKey: string, private http: HttpClient) { }

  getStockCandles(symbol: string, resolution: TIME_RESOLUTION, from: number, to: number): Observable<StockCandle[]> {

    function mapIntradayTimeSeries(res: IntradayTimeSeries, minutes: number): StockCandle[] {
      console.log(`Time Series (${minutes.toString()}min)`)
      console.log(res)
      const len = Object.keys(res[`Time Series (${minutes.toString()}min)`]).length;
      const data = new Array<StockCandle>(len);
      Object.entries(res[`Time Series (${minutes.toString()}min)`]).forEach((value, index) => {
        data[index] = {
          open: +value[1]['1. open'],
          close: +value[1]['4. close'],
          timestamp: new Date(Date.parse(value[0])),
          high: +value[1]['2. high'],
          low: +value[1]['3. low'],
          volume: +value[1]['5. volume']
        };
      });
      return data;
    }

    switch (resolution) {
      case TIME_RESOLUTION.ONE_MINUTE:
        return this.http.get<IntradayTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => mapIntradayTimeSeries(res, 1)));
      case TIME_RESOLUTION.FIVE_MINUTES:
        return this.http.get<IntradayTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => mapIntradayTimeSeries(res, 5)));
      case TIME_RESOLUTION.FIFTEEN_MINUTES:
        return this.http.get<IntradayTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => mapIntradayTimeSeries(res, 15)));
      case TIME_RESOLUTION.THIRTHY_MINUTES:
        return this.http.get<IntradayTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => mapIntradayTimeSeries(res, 30)));
      case TIME_RESOLUTION.SIXTY_MINUTES:
        return this.http.get<IntradayTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => mapIntradayTimeSeries(res, 60)));
      case TIME_RESOLUTION.ONE_DAY:
        return this.http.get<DailyTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => {
            const len = Object.keys(res['Time Series (Daily)']).length;
            const data = new Array<StockCandle>(len);
            Object.entries(res['Time Series (Daily)']).forEach((value, index) => {
              data[index] = {
                open: +value[1]['1. open'],
                close: +value[1]['4. close'],
                timestamp: new Date(Date.parse(value[0])),
                high: +value[1]['2. high'],
                low: +value[1]['3. low'],
                volume: +value[1]['5. volume']
              };
            });
            return data;
          }));
      case TIME_RESOLUTION.ONE_WEEK:
        return this.http.get<WeeklyTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => {
            const len = Object.keys(res['Weekly Time Series']).length;
            const data = new Array<StockCandle>(len);
            Object.entries(res['Weekly Time Series']).forEach((value, index) => {
              data[index] = {
                open: +value[1]['1. open'],
                close: +value[1]['4. close'],
                timestamp: new Date(Date.parse(value[0])),
                high: +value[1]['2. high'],
                low: +value[1]['3. low'],
                volume: +value[1]['5. volume']
              };
            });
            return data;
          }));
      case TIME_RESOLUTION.ONE_MONTH:
        return this.http.get<MonthlyTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => {
            const len = Object.keys(res['Monthly Time Series']).length;
            const data = new Array<StockCandle>(len);
            Object.entries(res['Monthly Time Series']).forEach((value, index) => {
              data[index] = {
                open: +value[1]['1. open'],
                close: +value[1]['4. close'],
                timestamp: new Date(Date.parse(value[0])),
                high: +value[1]['2. high'],
                low: +value[1]['3. low'],
                volume: +value[1]['5. volume']
              };
            });
            return data;
          }));

      case TIME_RESOLUTION.ALL:
        return this.http.get<MonthlyAdjustedTimeSeries>(getURLParams(resolution, symbol, this.APIKey))
          .pipe(map(res => {
            const len = Object.keys(res['Monthly Adjusted Time Series']).length;
            const data = new Array<StockCandle>(len);
            Object.entries(res['Monthly Adjusted Time Series']).forEach((value, index) => {
              data[index] = {
                open: +value[1]['1. open'],
                close: +value[1]['4. close'],
                timestamp: new Date(Date.parse(value[0])),
                high: +value[1]['2. high'],
                low: +value[1]['3. low'],
                volume: +value[1]['6. volume']
              };
            });
            return data;
          }));
    }
  }

}
