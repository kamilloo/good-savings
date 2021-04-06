import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceController } from './balance/balance.controller';
import { BalanceService } from './balance/balance.service';
import { ExchangeService } from './exchange/exchange.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { TradingModule } from './trading/trading.module';

@Module({
  imports: [TradingModule],
  controllers: [AppController, BalanceController, DashboardController],
  providers: [AppService, BalanceService, ExchangeService, DashboardService],
})
export class AppModule {}
