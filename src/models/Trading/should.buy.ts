import { Ticker } from '../ticker';
import { CandleRepository } from '../../trading/repositories/candle.repository';

export class ShouldBuy {
  constructor(private candleRepository: CandleRepository) {}

  check(ticker: Ticker, limit: number): boolean {
    let candles = this.candleRepository.get();
    if (candles.length > 3){
      // return
    }
    return false;
    // return +ticker.close > limit;
  }
}
