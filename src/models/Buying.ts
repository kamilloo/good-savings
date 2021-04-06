import {Order} from "./Order";
import {Trading} from "./Trading";
import {Ticker} from "./Ticker";
import {Base} from "./Base";

export class Buying implements Trading {
  constructor(private order:Order) {
  }
  syncOrder(): Order {
    return undefined;
  }

  canFill(): boolean {
    return false;
  }

  goto(ticker: Ticker): Trading {
    if (this.canFill()){
      let order = this.syncOrder();

      return new Base(500,50);
    }
    return this;
  }
}
