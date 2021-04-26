import { Order } from './order';
import { Trading } from './trading';
import { Ticker } from './ticker';
import { Base } from './base';
import { FillBuy } from './Trading/fill.buy';
import { PlaceOrder } from './Trading/place.order';
import { FillSell } from './Trading/fill.sell';
import { Quote } from './quote';
import { CandleRepository } from '../trading/repositories/candle.repository';

export class Selling extends Trading {
  private fillBuy: FillSell;
  private syncOrder: PlaceOrder;

  private bounce = 4;

  constructor(
    private order: Order,
    protected candleRepository: CandleRepository,
  ) {
    super(candleRepository);
    this.fillBuy = new FillSell();
    this.syncOrder = new PlaceOrder();
  }

  goto(ticker: Ticker): Promise<Trading> {
    if (this.fillBuy.check(ticker, +this.order.price)) {
      return this.syncOrder.sync(this.order).then((order) => {
        if (order.status == 'FILLED') {
          return new Quote(
            +order.price + this.bounce,
            +order.origQty,
            this.candleRepository,
          );
        }
        return this;
      });
    }
    return Promise.resolve(this);
  }
}
