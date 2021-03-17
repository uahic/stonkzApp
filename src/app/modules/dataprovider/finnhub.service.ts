import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../core/services/app-config/app-config.service';
import { FinnhubSearchResult } from './search-result.model';
import { SearchEngineService, SearchFilter } from '../search/search-engine.service';
import { Observable } from 'rxjs';
import { SearchResult } from '../search/search-result.model';
import { EXCHANGE_MAP } from './finnhub.exchange.record';
import { map } from 'rxjs/operators';

const ApiEndPoint = 'https://finnhub.io/api/v1';

function extractTickerAndExchange(symbol: string): [string, string] {
  let ticker, exchange = '';
  if (symbol.includes('.')) {
    [ticker, exchange] = symbol.split('.');
    console.log(ticker, exchange)
  }
  return [ticker, exchange];
}

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  private ApiKey: string | undefined;

  constructor(private http: HttpClient, private appConfig: AppConfigService, private searchEngine: SearchEngineService) {
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
              command: () => { console.log('yeah') }
            };
            return result;
          })),
        );
      return results$;
    });

  }

  symbolLookup(query: string): Observable<FinnhubSearchResult> {
    const url = `${ApiEndPoint}/search?q=${query}&token=${this.ApiKey}`;
    return this.http.get<FinnhubSearchResult>(url);
  }


}
