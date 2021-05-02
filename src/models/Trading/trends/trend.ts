import { Candle } from '../../candle';
import { Ticker } from '../../ticker';

export interface Trend {
  check(candles: Candle[], ticker: Ticker): boolean;
}
