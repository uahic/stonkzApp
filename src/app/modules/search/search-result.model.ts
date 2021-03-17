import { ExchangeRecord } from '../dataprovider/exchange.model';
export interface SearchResult {
  icon?: string;
  command: () => void;
  description: string;
  symbol: string;
  ticker: string;
  exchange: string;
  exchangeRecord: ExchangeRecord;
  source: string;
  type: string;
}

