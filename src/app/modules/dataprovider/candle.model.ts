import { of } from 'rxjs';

export interface FinnhubStockCandles {
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  t: number[];
  s: 'ok' | 'no_data';
}

export interface Candles {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
  time: number[];
  status: 'ok' | 'no_data';
}

export function finnhubToCandle(candle: FinnhubStockCandles): Candles {
  return {
    open: candle.o,
    high: candle.h,
    low: candle.l,
    close: candle.c,
    volume: candle.v,
    time: candle.t,
    status: candle.s
  }
}
