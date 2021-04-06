import {Order} from "./order";
import {Trading} from "./trading";
import {Ticker} from "./ticker";
import {Base} from "./base";
import {FillBuy} from "./Trading/fill.buy";
import {PlaceOrder} from "./Trading/place.order";

export class Buying extends Trading {
  private fillBuy: FillBuy;
  private syncOrder: PlaceOrder;
    private bounce:number = 10;

    constructor(private order:Order) {
    super();
    this.fillBuy = new FillBuy();
    this.syncOrder = new PlaceOrder();
  }

  goto(ticker: Ticker): Promise<Trading> {
    if (this.fillBuy.check(ticker, +this.order.price)){
      return this.syncOrder.sync(this.order)
          .then((order) => {
            if (order.status == 'FILLED'){
              return new Base(+order.price - this.bounce, +order.origQty)
            }
            return this;
          });
    }
    return Promise.resolve(this);
  }
}
