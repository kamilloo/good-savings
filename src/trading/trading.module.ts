import { Module } from '@nestjs/common';
import { TradeService } from './trade-service';
import { ExchangeService } from '../exchange/exchange.service';
import { CandleRepository } from './repositories/candle.repository';

@Module({
  providers: [TradeService, ExchangeService, CandleRepository],
})
export class TradingModule {}
