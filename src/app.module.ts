import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceController } from './balance/balance.controller';
import { BalanceService } from './balance/balance.service';
import { ExchangeService } from './exchange/exchange.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { TradingModule } from './trading/trading.module';
import { OrderController } from './orders/order.controller';
import { OrderService } from './orders/order.service';
import { TradeController } from './trades/trade.controller';
import { TradeService } from './trades/trade.service';
import { BotService } from './bot/BotService';

@Module({
  imports: [TradingModule],
  controllers: [
    AppController,
    BalanceController,
    DashboardController,
    OrderController,
    TradeController,
  ],
  providers: [
    AppService,
    BalanceService,
    ExchangeService,
    DashboardService,
    OrderService,
    TradeService,
    BotService,
  ],
})
export class AppModule {}
