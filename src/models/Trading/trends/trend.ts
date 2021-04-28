import { Candle } from '../../candle';

export interface Trend {
  check(candles: Candle[]): boolean;
}
