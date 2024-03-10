import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';
import { Ticker } from '../models/ticker';
import { Trader } from '../models/trader';
import { Quote } from '../models/quote';
import { Candle } from '../models/candle';
import { Candlestick } from '../models/candlestick';
import { CandleRepository } from './repositories/candle.repository';
import { EventType } from '../models/Enums/event.type';
import { CoinPairRepository } from './repositories/CoinPair.repository';
import { CoinPair } from '../models/CoinPair';
import { IntervalType } from '../models/Enums/interval.type';
import { Signal } from '../models/Signal';
import { EventEmitter } from 'events';
import { IntervalRepository } from './repositories/interval.repository';

@Injectable()
export class TradeService {
  // private coin = 'ETHUSDT';

  // private ticker: Ticker;

  // private trader: Trader;

  private notifier: EventEmitter;

  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly candleRepository: CandleRepository,
    private readonly coinPairRepository: CoinPairRepository,
    private readonly intervalRepository: IntervalRepository,
  ) {
    this.notifier = require('../events/SignalEmitter');

    this.exchangeService.init();
    // this.exchangeService.ticker(this.coin).then((ticker) => {});
    this.initial();
  }

  // initial(trader:Trader){
  initial() {
    this.candleRepository.init(
      this.coinPairRepository.getall(),
      this.intervalRepository.getall(),
    );

    this.exchangeService
      .candles(
        this.coinPairRepository.getall(),
        this.intervalRepository.getall(),
      )
      .then((candlestick) => {
        console.log(candlestick);
      });

    // this.trader = new Trader(new Quote(671, 0.04, this.candleRepository));

    // this.exchangeService.on('ticker', (ticker) => {
    // this.trigger(ticker);
    // });

    // this.coinPairRepository.getall().forEach((coinPair:CoinPair) => {
    //   this.exchangeService
    //       .history(coinPair.name)
    //       .then((history: [string: Candle]) => {
    //         for (const time in history) {
    //           if (+time > new Date(Date.now() - 2 * 15 * 60000).getTime()) {
    //             const candle: Candle = history[time];
    //             candle.time = +time;
    //             candle.isFinal = true;
    //             candle.isBullish = +candle.close - +candle.open > 0;
    //             candle.symbol = coinPair.name;
    //             candle.interval = IntervalType.FIFTEEN_MINUTE;
    //             this.candleRepository.addCandle(candle);
    //           }
    //         }
    //       });
    // })

    this.exchangeService.on('candlesticks', (candlestick: Candlestick) => {
      if (this.isCandleStick(candlestick)) {
        const candle = this.transformToCandle(candlestick);
        this.addCandle(candle);
      }
    });
  }

  private transformToCandle(candlestick: Candlestick): Candle {
    const interval_type = candlestick.k.i;
    const interval = this.intervalRepository.getByType(interval_type);
    const interval_length_ms = interval.length_ms;
    const factor = Math.floor(+candlestick.E / interval_length_ms);
    const time = factor * interval_length_ms;
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

  // trigger(ticker: Ticker) {
  //   this.trader.call(ticker);
  // }

  private isCandleStick(candlestick: Candlestick): boolean {
    return candlestick.e == EventType.KLINE;
  }

  addCandle(candle: Candle): boolean {
    const lastCandle = this.candleRepository.getLast(candle);
    if (lastCandle) {
      if (lastCandle.time == candle.time) {
        this.candleRepository.pop(candle);
      } else if (lastCandle.time > candle.time) {
        return false;
      } else {
        lastCandle.isFinal = true;
        const firstCandle: Candle | null =
          this.candleRepository.getFirst(candle);
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

    this.candleRepository.push(candle);
    if (this.candleRepository.length(candle) > 3) {
      this.candleRepository.pop(candle);
    }
    return true;
  }
}
