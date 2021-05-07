import { Trend } from '../trend';
import { Candle } from '../../../candle';
import { Ticker } from '../../../ticker';

export class ShootingStar implements Trend {
  check(candles: Candle[], ticker: Ticker): boolean {
    if (candles.length < 3) {
      return false;
    }
    const currentCandle = candles[candles.length - 1];
    if (currentCandle.isFinal) {
      return false;
    }
    const oneBeforePreviousCandle = candles[candles.length - 3];
    const previousCandle = candles[candles.length - 2];

    if (!oneBeforePreviousCandle.isBullish) {
      return false;
    }

    if (previousCandle.isBullish) {
      return false;
    }

    if (
      +previousCandle.high - +previousCandle.open <=
      (+previousCandle.open - +previousCandle.close) * 2
    ) {
      return false;
    }

    if (
      (+previousCandle.close - +previousCandle.low) / +previousCandle.close >=
      0.003
    ) {
      return false;
    }

    if (
      (+previousCandle.open - +previousCandle.close) / +previousCandle.close >=
      0.003
    ) {
      return false;
    }

    return true;
  }
}
