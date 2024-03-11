import { Injectable } from '@nestjs/common';
import { Candle } from '../../models/candle';
import { CoinPair } from '../../models/CoinPair';
import { Interval } from '../../models/Interval';

interface candles {
  [key: string]: Candle[];
}

@Injectable()
export class CandleRepository {
  private candles: candles = {};

  init(coinPairs: CoinPair[], intervals: Interval[]): void {
    coinPairs.forEach((coinPair: CoinPair) => {
      intervals.forEach(
        (i: Interval) => (this.candles[coinPair.name + '_' + i.type] = []),
      );
    });
  }

  get(): Candle[] {
    return this.candles[0];
  }

  getLast(candle: Candle): Candle | null {
    const candles = this.candles[this.parseKey(candle)];
    const length = candles.length;
    if (length > 0) {
      return candles[length - 1];
    }
    return null;
  }

  private parseKey(candle: Candle): string {
    return (candle.symbol + '_' + candle.interval).toLowerCase();
  }

  getFirst(candle: Candle): Candle | null {
    const candles = this.candles[this.parseKey(candle)];
    const length = candles.length;
    if (length > 1) {
      return candles[length - 2];
    }
    return null;
  }

  getCandles(candle: Candle): Candle[] {
    return this.candles[this.parseKey(candle)];
  }

  pop(candle: Candle) {
    const candles = this.candles[this.parseKey(candle)];
    candles.pop();
  }

  push(candle: Candle) {
    const candles = this.candles[this.parseKey(candle)];
    candles.push(candle);
  }

  length(candle: Candle): number {
    const candles = this.candles[this.parseKey(candle)];
    return candles.length;
  }

  shift(candle: Candle) {
    const candles = this.candles[this.parseKey(candle)];
    candles.shift();
  }
}
