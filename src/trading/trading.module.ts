import { Module } from '@nestjs/common';
import { TradeService } from './trade-service';
import { ExchangeService } from '../exchange/exchange.service';
import { CandleRepository } from './repositories/candle.repository';
import { CoinPairRepository } from './repositories/CoinPair.repository';
import { IntervalRepository } from './repositories/interval.repository';

@Module({
  providers: [
    TradeService,
    ExchangeService,
    CandleRepository,
    CoinPairRepository,
    IntervalRepository,
  ],
})
export class TradingModule {}
