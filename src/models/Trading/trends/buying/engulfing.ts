import { Trend } from '../trend';
import { Candle } from '../../../candle';

export class Engulfing implements Trend {
  check(candles: Candle[]): boolean {
    return false;
  }
}
