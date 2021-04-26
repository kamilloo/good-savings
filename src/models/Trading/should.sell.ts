import { Ticker } from '../ticker';
import { CandleRepository } from '../../trading/repositories/candle.repository';

export class ShouldSell {
  constructor(private candleRepository: CandleRepository) {}

  check(ticker: Ticker, limit: number): boolean {
    return +ticker.close < limit;
  }
}
