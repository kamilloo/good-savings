import { Ticker } from './ticker';
import { CandleRepository } from '../trading/repositories/candle.repository';

export abstract class Trading {
  constructor(protected candleRepository: CandleRepository) {
    console.log(this);
  }
  abstract goto(ticker: Ticker): Promise<Trading>;
}
