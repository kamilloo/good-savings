import { Trend } from '../trend';
import { Candle } from '../../../candle';
import { Ticker } from '../../../ticker';

export class PinBar implements Trend {
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

    if (previousCandle.close >= oneBeforePreviousCandle.high) {
      return false;
    }

    const bar = Number(
      (+previousCandle.open / +previousCandle.close).toFixed(2),
    );
    if (bar < 0.95 || bar > 1.05) {
      return false;
    }

    if (previousCandle.high <= oneBeforePreviousCandle.high) {
      return false;
    }

    //0. has last not final
    //1. 2 previuos was bearish
    //2. 1 previous went down
    // 3.close near 2 previous candle
    // 4. price went go above 1 preveios hi
    return true;
  }
}
