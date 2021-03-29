import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceController } from './balance/balance.controller';

@Module({
  imports: [],
  controllers: [AppController, BalanceController],
  providers: [AppService],
})
export class AppModule {}
