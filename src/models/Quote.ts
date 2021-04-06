import {Order} from "./Order";
import {Trading} from "./Trading";
import {Ticker} from "./Ticker";
import {Buying} from "./Buying";
import {ShouldBuy} from "./Trading/should.buy";
import {LowerBuy} from "./Trading/lower.buy";

export class Quote implements Trading {

  private shouldBuy: ShouldBuy;
  private lowerBuy: LowerBuy;
  constructor(private limit:number, private quantity:number) {
    this.shouldBuy = new ShouldBuy();
    this.lowerBuy = new LowerBuy();
  }

  goto(ticker: Ticker): Trading {

    if(this.shouldBuy.check(ticker, this.limit){
      let order = this.placeOrder(this.limit, this.quantity, 'buy');
      return new Buying(order);
    }
    this.limit = this.lowerBuy.check(ticker, this.limit));

    return this;
  }
}
