import { Injectable } from '@nestjs/common';
import { Candle } from '../../models/candle';
import { Candlestick } from '../../models/candlestick';
// import { SignalEmitter } from '../../events/SignalEmitter';
import { Signal } from '../../models/Signal';
import { EventEmitter } from 'events';

@Injectable()
export class CandleRepository {
  private candles: Candle[] = [];

  private interval = 60;
  private notifier: EventEmitter;

  constructor() {
    this.notifier = require('../../events/SignalEmitter');
  }

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

  getFirst(): Candle | null {
    const length = this.candles.length;
    if (length > 0) {
      return this.candles[0];
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
        const firstCandle: Candle | null = this.getFirst();
        if (
          firstCandle &&
          firstCandle.isFinal &&
          firstCandle.time < lastCandle.time &&
          lastCandle.isBullish &&
          +lastCandle.volume > 3 * +firstCandle.volume
        ) {
          firstCandle;
          const rawFirstCandle = JSON.stringify(firstCandle);
          const rawLastCandle = JSON.stringify(lastCandle);
          const debug =
            'first candle: ' +
            rawFirstCandle +
            '/' +
            'second candle' +
            rawLastCandle;
          this.notifier.emit('signal', {
            debug: debug,
            coin: lastCandle.symbol,
            interval: lastCandle.interval,
            factor:
              Math.round((+lastCandle.volume / +firstCandle.volume) * 100) /
              100,
          } as Signal);
        }
      }
    }
    this.candles.push(candle);
    if (this.candles.length > 3) {
      this.candles.shift();
    }
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
      interval: candlestick.k.i,
      symbol: candlestick.s,
    };
  }
}
