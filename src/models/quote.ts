import {Order} from "./order";
import {Trading} from "./trading";
import {Ticker} from "./ticker";
import {Buying} from "./buying";
import {ShouldBuy} from "./Trading/should.buy";
import {LowerBuy} from "./Trading/lower.buy";
import {PlaceOrder} from "./Trading/place.order";

export class Quote extends Trading {

  private shouldBuy: ShouldBuy;
  private lowerBuy: LowerBuy;
  private placeOrder: PlaceOrder;
  constructor(private limit:number, private quantity:number) {
    super();
    this.shouldBuy = new ShouldBuy();
    this.lowerBuy = new LowerBuy();
    this.placeOrder = new PlaceOrder();
  }

  goto(ticker: Ticker):Promise<Trading> {

    if(this.shouldBuy.check(ticker, this.limit)) {
      return this.placeOrder.place(this.limit, this.quantity)
          .then((order) => {
        return new Buying(order)
      });
    }
    this.limit = this.lowerBuy.check(ticker, this.limit);
    return Promise.resolve(this);
  }
}
