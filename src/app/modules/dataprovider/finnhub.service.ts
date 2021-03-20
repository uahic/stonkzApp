import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../core/services/app-config/app-config.service';
import { FinnhubSearchResult } from './search-result.model';
import { SearchEngineService, SearchFilter } from '../search/search-engine.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../search/search-result.model';
import { FinnhubQuote, finnhubToQuote, Quote } from './quote.model';
import { Candles, FinnhubStockCandles, finnhubToCandle } from './candle.model';
import { DataProvider, QueryOptions } from './data-provider.model';
import { EXCHANGE_MAP } from './finnhub.exchange.record';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const ApiEndPoint = 'https://finnhub.io/api/v1';

function extractTickerAndExchange(symbol: string): [string, string] {
  let ticker, exchange = '';
  if (symbol.includes('.')) {
    [ticker, exchange] = symbol.split('.');
  }
  return [ticker, exchange];
}

@Injectable({
  providedIn: 'root'
})
export class FinnhubService implements DataProvider {
  private ApiKey: string | undefined;

  constructor(private http: HttpClient, private appConfig: AppConfigService, private searchEngine: SearchEngineService, private router: Router) {
    const config = appConfig.getConfig();
    if (!("finnhub" in config.apis)) {
      console.warn("No API key given for Finnhub data service");
    } else {
      this.ApiKey = config.apis['finnhub'].key;
    }

    this.registerAtSearchEngine();
  }


  private registerAtSearchEngine(): void {
    this.searchEngine.registerSource('finnhub', (_query: string, _filter: SearchFilter) => {
      const results$ = this.symbolLookup(_query)
        .pipe(
          map(value => value.result.map(val => {
            const [ticker, exchange] = extractTickerAndExchange(val.symbol);
            const result: SearchResult = {
              symbol: val.symbol,
              description: val.description,
              type: val.type,
              ticker: ticker,
              exchange: exchange,
              exchangeRecord: EXCHANGE_MAP.has(exchange) ? EXCHANGE_MAP.get(exchange) : undefined,
              source: 'finnhub',
              command: () => { this.router.navigate(['/quotes/detail', val.symbol], { queryParams: { provider: 'finnhub' } }); }
            };
            return result;
          })),
        );
      return results$;
    });

  }

  getProviderID(): string {
    return 'finnhub';
  }

  symbolLookup(query: string): Observable<FinnhubSearchResult> {
    const url = `${ApiEndPoint}/search?q=${query}&token=${this.ApiKey}`;
    return this.http.get<FinnhubSearchResult>(url);
  }

  getStockQuotes(symbol: string, options: QueryOptions): Observable<Quote> {
    const url = `${ApiEndPoint}/quote?${symbol}&token=${this.ApiKey}`;
    return this.http.get<FinnhubQuote>(url)
      .pipe(map(value => finnhubToQuote(value)));
  }

  getStockCandles(symbol: string, options: QueryOptions): Observable<Candles> {
    const url = `${ApiEndPoint}/stock/candle?symbol=${symbol}&resolution=${options.resolution}&from=${options.from}&to=${options.to}&token=${this.ApiKey}`;
    console.log(url)
    return this.http.get<FinnhubStockCandles>(url)
      .pipe(
        map(value => finnhubToCandle(value)));
  }

}
