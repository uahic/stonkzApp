export interface FinnhubQuote {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
  t: number;
}
export function finnhubToQuote(quote: FinnhubQuote): Quote {
  return {
    open: quote.o,
    high: quote.h,
    low: quote.l,
    current: quote.c,
    previous_close: quote.pc,
    time: quote.t
  }
}


export interface Quote {
  open: number;
  high: number;
  low: number;
  current: number;
  previous_close: number;
  time?: number;
}
