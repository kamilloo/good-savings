import { Ticker } from '../ticker';
import { CandleRepository } from '../../trading/repositories/candle.repository';
import { Trend } from './trends/trend';
import { PinBar } from './trends/buying/pin.bar';

export class ShouldBuy {
  private schemas: Trend[] = [new PinBar()];
  private goTrade = false;
  constructor(private candleRepository: CandleRepository) {}

  check(ticker: Ticker, limit: number): boolean {
    const candles = this.candleRepository.get();
    if (candles.length > 3) {
      this.schemas.forEach((schema: Trend) => {
        if (!this.goTrade) {
          this.goTrade = schema.check(candles);
        }
      });
    }
    if (this.goTrade) {
      console.log(candles[candles.length - 1].time);
    }

    return this.goTrade;

    // return +ticker.close > limit;
  }
}
