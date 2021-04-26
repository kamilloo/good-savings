import { Order } from './order';
import { Trading } from './trading';
import { Ticker } from './ticker';
import { Buying } from './buying';
import { ShouldBuy } from './Trading/should.buy';
import { LowerBuy } from './Trading/lower.buy';
import { PlaceOrder } from './Trading/place.order';
import { CandleRepository } from '../trading/repositories/candle.repository';

export class Quote extends Trading {
  private shouldBuy: ShouldBuy;
  private lowerBuy: LowerBuy;
  private placeOrder: PlaceOrder;
  constructor(
    private limit: number,
    private quantity: number,
    protected candleRepository: CandleRepository,
  ) {
    super(candleRepository);
    this.shouldBuy = new ShouldBuy(candleRepository);
    this.lowerBuy = new LowerBuy();
    this.placeOrder = new PlaceOrder();
  }

  goto(ticker: Ticker): Promise<Trading> {
    if (this.shouldBuy.check(ticker, this.limit)) {
      // return this.placeOrder.place(this.limit, this.quantity)
      return this.placeOrder
        .place(+ticker.close, this.quantity)
        .then((order) => {
          return new Buying(order, this.candleRepository);
        });
    }
    this.limit = this.lowerBuy.check(ticker, this.limit);
    return Promise.resolve(this);
  }
}
