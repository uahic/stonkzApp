import { Observable } from 'rxjs';

export enum TIME_SERIES_FUNCTION {
  INTRADAY = 'INTRADAY',
  INTRADAY_EXTENDED = 'INTRADAY_EXTENDED',
  DAILY = 'DAILY',
  DAILY_ADJUSTED = 'DAILY_ADJUSTED',
  WEEKLY = 'WEEKLY',
  WEEKLY_ADJUSTED = 'WEEKLY_ADJUSTED',
  MONTHLY = 'MONTHLY',
  MONTHLY_ADJUSTED = 'MONTHLY_ADJUSTED',
}

export enum TIME_RESOLUTION {
  ONE_MINUTE,
  FIVE_MINUTES,
  FIFTEEN_MINUTES,
  THIRTHY_MINUTES,
  SIXTY_MINUTES,
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
  ALL
}

export interface StockCandle {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  timestamp: Date;
}

// export interface StockCandles {

// }

export abstract class StockAPIService {

  abstract getStockCandles(symbol: string, resolution: TIME_RESOLUTION, from: number, to: number): Observable<StockCandle[]>;
}
