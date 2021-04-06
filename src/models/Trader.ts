import {Trading} from "./Trading";
import {Base} from "./Base";
import {Ticker} from "./Ticker";

export class Trader {

  private trading;

  constructor(trading: Trading) {
    this.trading = trading;
  }

  call(ticker:Ticker):void {
    this.trading = this.trading.goto(ticker);
  }
}
