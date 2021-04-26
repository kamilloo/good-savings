import { Order } from './order';
import { Trading } from './trading';
import { Ticker } from './ticker';
import { Buying } from './buying';
import { ShouldBuy } from './Trading/should.buy';
import { LowerBuy } from './Trading/lower.buy';
import { PlaceOrder } from './Trading/place.order';
import { ShouldSell } from './Trading/should.sell';
import { HigherSell } from './Trading/higher.sell';
import { Selling } from './selling';
import { CandleRepository } from '../trading/repositories/candle.repository';

export class Base extends Trading {
  private shouldSell: ShouldSell;
  private higherSell: HigherSell;
  private placeOrder: PlaceOrder;

  constructor(
    private limit: number,
    private quantity: number,
    protected candleRepository: CandleRepository,
  ) {
    super(candleRepository);
    this.shouldSell = new ShouldSell(candleRepository);
    this.higherSell = new HigherSell();
    this.placeOrder = new PlaceOrder();
  }

  goto(ticker: Ticker): Promise<Trading> {
    if (this.shouldSell.check(ticker, this.limit)) {
      // return this.placeOrder.placeSell(this.limit, this.quantity)
      return this.placeOrder
        .placeSell(+ticker.close, this.quantity)
        .then((order) => {
          return new Selling(order, this.candleRepository);
        });
    }
    this.limit = this.higherSell.check(ticker, this.limit);
    return Promise.resolve(this);
  }
}
