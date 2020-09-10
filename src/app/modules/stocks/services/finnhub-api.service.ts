import { StockAPIService, StockCandle, TIME_RESOLUTION } from './stock-api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


interface FinnhubStockCandle {
  o: number[];
  c: number[];
  h: number[];
  l: number[];
  v: number[];
  t: number[];
  s: 'ok' | 'no_data';
}


const APIEndPoint = `https://finnhub.io/api/v1/`;

export class FinnhubAPIService implements StockAPIService {

  constructor(private APIKey: string, private http: HttpClient) { }

  getStockCandles(symbol: string, resolution: TIME_RESOLUTION, from: number, to: number): Observable<StockCandle[]> {
    let candleURL = `${APIEndPoint}/stock/candle?symbol=${symbol}&resolution=${resolution}`;
    candleURL = `${candleURL}&from=${from}&to=${to} `;
    candleURL = `${candleURL}&token=${this.APIKey}`;
    return this.http.get<FinnhubStockCandle>(candleURL)
      .pipe(
        map(res => {
          if (res.s === 'ok') {
            const data = new Array<StockCandle>(open.length);
            for (let index = 0; index < open.length; index++) {
              data[index] = {
                open: res.o[index],
                close: res.c[index],
                high: res.h[index],
                low: res.l[index],
                volume: res.v[index],
                timestamp: new Date(res.t[index])
              };
            }
            return data;
          } else {
            throw new Error('no Data');
          }
        }
        )

      )
  }
}
