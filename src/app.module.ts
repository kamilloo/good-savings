import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceController } from './balance/balance.controller';
import { BalanceService } from './balance/balance.service';
import { ExchangeService } from './exchange/exchange.service';

@Module({
  imports: [],
  controllers: [AppController, BalanceController],
  providers: [AppService, BalanceService, ExchangeService],
})
export class AppModule {}
