import { Injectable } from '@nestjs/common';
import { Candle } from '../../models/candle';
import { Candlestick } from '../../models/candlestick';

@Injectable()
export class CandleRepository {
  private candles: Candle[] = [];

  private interval = 60;

  constructor() {}

  get(): Candle[] {
    return this.candles;
  }

  getLast(): Candle | null {
    const length = this.candles.length;
    if (length > 0) {
      return this.candles[length - 1];
    }
    return null;
  }
  addCandle(candle: Candle): boolean {
    const lastCandle = this.getLast();
    if (lastCandle) {
      if (lastCandle.time == candle.time) {
        this.candles.pop();
      } else if (lastCandle.time > candle.time) {
        const found = this.candles.findIndex((cachedCandle, index, candles) => {
          return cachedCandle.time == candle.time;
        });
        this.candles[found] = candle;
        return false;
      } else {
        lastCandle.isFinal = true;
      }
    }
    this.candles.push(candle);
    if (this.candles.length > 500) {
      this.candles.shift();
    }
    console.log(this.candles);
    return true;
  }

  addCandlestick(candlestick: Candlestick): boolean {
    const candle = this.transformToCandle(candlestick);
    return this.addCandle(candle);
  }

  private transformToCandle(candlestick: Candlestick): Candle {
    const interval = this.interval * 1000;
    const factor = Math.floor(+candlestick.E / interval);
    const time = factor * interval;
    const open = candlestick.k.o;
    const close = candlestick.k.c;
    return <Candle>{
      open: open,
      high: candlestick.k.h,
      low: candlestick.k.l,
      close: close,
      volume: candlestick.k.v,
      time: time,
      isFinal: false,
      isBullish: +close - +open > 0,
    };
  }
}
