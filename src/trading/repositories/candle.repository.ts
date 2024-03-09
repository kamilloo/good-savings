import { Injectable } from '@nestjs/common';
import { Candle } from '../../models/candle';

@Injectable()
export class CandleRepository {
  private candles: Candle[] = [];

  get(): Candle[] {
    return this.candles;
  }

  getLast(candle: Candle): Candle | null {
    const filtered = this.candles.filter(
      (iter: Candle) => iter.symbol == candle.symbol,
    );
    const length = filtered.length;
    if (length > 0) {
      return this.candles[length - 1];
    }
    return null;
  }

  getFirst(candle: Candle): Candle | null {
    const filtered = this.candles.filter(
      (iter: Candle) => iter.symbol == candle.symbol,
    );
    const length = filtered.length;
    if (length > 1) {
      return this.candles[length - 2];
    }
    return null;
  }

  getCandle(candle: Candle): void {
    const found = this.find(candle);
    if (found > -1) {
      this.candles[found] = candle;
    }
  }

  private find(candle: Candle) {
    const found = this.candles.findIndex((cachedCandle, index, candles) => {
      return (
        cachedCandle.time == candle.time && cachedCandle.symbol == candle.symbol
      );
    });
    return found;
  }

  pop(candle: Candle) {
    // this.candles.pop();
    const found = this.find(candle);
    if (found > -1) {
      this.candles.splice(found, 1);
    }
  }

  push(candle: Candle) {
    this.candles.push(candle);
  }

  length(candle: Candle): number {
    const filtered = this.candles.filter(
      (iter: Candle) => iter.symbol == candle.symbol,
    );
    return filtered.length;
  }
}
