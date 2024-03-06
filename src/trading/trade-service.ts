import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';
import { Ticker } from '../models/ticker';
import { Trader } from '../models/trader';
import { Quote } from '../models/quote';
import { Candle } from '../models/candle';
import { Candlestick } from '../models/candlestick';
import { CandleRepository } from './repositories/candle.repository';
import { EventType } from '../models/Enums/event.type';

@Injectable()
export class TradeService {
  private coin = 'ETHUSDT';

  private ticker: Ticker;

  private trader: Trader;

  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly candleRepository: CandleRepository,
  ) {
    this.exchangeService.init();
    this.exchangeService.ticker(this.coin).then((ticker) => {});
    this.exchangeService.candles(this.coin).then((candlestick) => {});
    this.initial();
  }

  // initial(trader:Trader){
  initial() {
    this.trader = new Trader(new Quote(671, 0.04, this.candleRepository));

    this.exchangeService.on('ticker', (ticker) => {
      // this.trigger(ticker);
    });

    this.exchangeService
      .history(this.coin)
      .then((history: [string: Candle]) => {
        for (const time in history) {
          if (+time > new Date(Date.now() - 2 * 60000).getTime()) {
            const candle: Candle = history[time];
            candle.time = +time;
            candle.isFinal = true;
            candle.isBullish = +candle.close - +candle.open > 0;
            candle.symbol = this.coin;
            candle.interval = '15m';
            this.candleRepository.addCandle(candle);
          }
        }
      });

    this.exchangeService.on('candlesticks', (candlestick: Candlestick) => {
      if (this.isCandleStick(candlestick)) {
        this.candleRepository.addCandlestick(candlestick);
      }
    });
  }

  trigger(ticker: Ticker) {
    this.trader.call(ticker);
  }

  private isCandleStick(candlestick: Candlestick): boolean {
    return candlestick.e == EventType.KLINE;
  }
}
