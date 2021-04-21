import { Test, TestingModule } from '@nestjs/testing';
import { TradeService } from './trade-service';
import {ExchangeService} from "../exchange/exchange.service";
import {Ticker} from "../models/ticker";
import {Trader} from "../models/trader";
import {Quote} from "../models/quote";

describe('TradeService', () => {
  let provider: TradeService;

  let exchangeService:ExchangeService;

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
  }

  beforeEach(async () => {

    initDepedencies()

    provider = new TradeService(exchangeService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('start follow published rates', function () {

    //When
    let ticker:Ticker = <any>{ close: 1.0 };
    let trader:Trader = new Trader(new Quote(500, 50));

    // provider.initial();
    provider.trigger(ticker);

  });
});
