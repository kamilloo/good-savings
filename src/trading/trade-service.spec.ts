import { Test, TestingModule } from '@nestjs/testing';
import { TradeService } from './trade-service';
import { ExchangeService } from '../exchange/exchange.service';
import { Ticker } from '../models/ticker';
import { Trader } from '../models/trader';
import { Quote } from '../models/quote';
import { CandleRepository } from './repositories/candle.repository';
import { Candle } from '../models/candle';
import { Candlestick } from '../models/candlestick';

describe('TradeService', () => {
  let provider: TradeService;

  let exchangeService: ExchangeService;

  let candleRepository: CandleRepository;

  let candleRepositoryAddCandle: jest.SpyInstance;
  let candleRepositoryAddCandlestick: jest.SpyInstance;

  function initDepedencies() {
    exchangeService = <any>{
      ticker: () => {
        return Promise.resolve(1);
      },
      candles: () => {
        return Promise.resolve(1);
      },
      history: () => {
        return Promise.resolve([]);
      },
      init: () => {},
      on: () => {},
    };

    candleRepositoryAddCandle = jest.fn();
    candleRepositoryAddCandlestick = jest.fn();

    candleRepository = <any>{
      get: () => {},
      getLast: () => {},
      addCandle: candleRepositoryAddCandle,
      addCandlestick: candleRepositoryAddCandlestick,
    };
  }

  beforeEach(async () => {
    initDepedencies();
  });

  it('start follow published rates', function () {
    //When
    const ticker: Ticker = <any>{ close: 1.0 };
    const trader: Trader = new Trader(new Quote(500, 50));

    provider = new TradeService(exchangeService, candleRepository);

    provider.trigger(ticker);
  });

  it('history should add to repository', async () => {
    const candle: Candle = <any>{
      open: '0.00100090',
      high: '0.00100650',
      low: '0.00099810',
      close: '0.00100370',
      volume: '1161.52000000',
      time: 1000000,
    };
    const gettingHistoryCandle = () => {
      return Promise.resolve({ '10000': candle });
    };

    exchangeService.history = <any>gettingHistoryCandle;

    provider = await new TradeService(exchangeService, candleRepository);

    //When
    const ticker: Ticker = <any>{ close: 1.0 };
    // const trader: Trader = new Trader(new Quote(500, 50));

    // provider.initial();
    provider.trigger(ticker);

    expect(candleRepositoryAddCandle.mock.calls.length).toBe(1);
  });
});
