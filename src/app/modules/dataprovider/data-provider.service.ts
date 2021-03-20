import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Candles } from './candle.model';
import { DataProvider, QueryOptions } from './data-provider.model';
import { FinnhubService } from './finnhub.service';
import { Quote } from './quote.model';

const ApiEndPoint = 'https://finnhub.io/api/v1';


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private providerMap = new Map<string, DataProvider>();

  constructor(private finnhub: FinnhubService) {
    this.registerDataProvider(this.finnhub);
  }

  registerDataProvider(provider: DataProvider): void {
    this.providerMap.set(provider.getProviderID(), provider);
  }

  getQuotes(symbol: string, options: QueryOptions): Observable<Quote> {
    return this.providerMap.get('finnhub').getStockQuotes(symbol, options);
  }

  getCandles(symbol: string, options: QueryOptions): Observable<Candles> {
    return this.providerMap.get('finnhub').getStockCandles(symbol, options);
  }

}
