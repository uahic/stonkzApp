import { Observable } from 'rxjs';
import { Candles } from './candle.model';
import { Quote } from './quote.model';

export type Resolution = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M';

export interface QueryOptions {
  // UNIX timestamp
  from: number;
  // UNIX timestamp
  to: number;
  resolution: Resolution;
  source?: string;
  count?: number;
}

export interface DataProvider {
  getProviderID(): string;
  getStockQuotes(symbol: string, options: QueryOptions): Observable<Quote>;
  getStockCandles(symbol: string, options: QueryOptions): Observable<Candles>;

}
