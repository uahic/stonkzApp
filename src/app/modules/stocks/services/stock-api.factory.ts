import { AlphavantageAPIService } from './alphavantage-api.service';
import { FinnhubAPIService } from './finnhub-api.service';
import { StockAPIService } from './stock-api';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../core/services/app-config/app-config.service';

export function StockAPIFactory(configService: AppConfigService, http: HttpClient): StockAPIService {
  const config = configService.getConfig();
  if (!!config && !!config.stockAPI && config.stockAPI === 'finnhub') {
    return new FinnhubAPIService(config.stockAPIKey, http);
  } else {
    return new AlphavantageAPIService(config.stockAPIKey, http);
  }
}
