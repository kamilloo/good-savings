import { Module } from '@nestjs/common';
import { TradeService } from './trade-service';
import {ExchangeService} from "../exchange/exchange.service";

@Module({
  providers: [TradeService, ExchangeService],
})
export class TradingModule {}
