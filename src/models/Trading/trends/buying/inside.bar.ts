import { Trend } from '../trend';
import { Candle } from '../../../candle';
import { Ticker } from '../../../ticker';

export class InsideBar implements Trend {
  check(candles: Candle[], ticker: Ticker): boolean {
    if (candles.length < 3) {
      return false;
    }
    const currentCandle = candles[candles.length - 1];
    if (currentCandle.isFinal) {
      return false;
    }

    candles.pop();

    const candleReverse = candles.reverse();
    const oneBeforeMotherBarCandidate = candleReverse.findIndex(
      (candle: Candle) => +candle.high > +ticker.close,
    );
    if (oneBeforeMotherBarCandidate == -1) {
      return false;
    }

    const motherBarCandidate = candleReverse[oneBeforeMotherBarCandidate - 1];

    if (motherBarCandidate === undefined || !motherBarCandidate.isBullish) {
      return false;
    }

    const candlesAfterMotherBarCandidate = candleReverse.slice(
      0,
      oneBeforeMotherBarCandidate - 1,
    );

    if (!candlesAfterMotherBarCandidate.length) {
      return false;
    }
    const lowMinSort = candlesAfterMotherBarCandidate.sort((a, b) =>
      a.low < b.low ? -1 : 1,
    );

    return +motherBarCandidate.low < +lowMinSort[0].low;
  }
}
