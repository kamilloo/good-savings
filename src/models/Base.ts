import {Order} from "./Order";
import {Trading} from "./Trading";
import {Ticker} from "./Ticker";

export class Base implements Trading {

  constructor(private limit: number, private quantity: number) {
  }
  placeOrder(): Order {
    return undefined;
  }

  shouldTrade(): boolean {
    return false;
  }

  goto(ticker: Ticker): Trading {


    return this;
  }
}
