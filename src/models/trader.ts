import {Trading} from "./trading";
import {Base} from "./base";
import {Ticker} from "./ticker";

export class Trader {

  private trading:Trading;

  private freezing:boolean = false;

  constructor(trading: Trading) {
    this.trading = trading;
  }

  call(ticker:Ticker):void {
    if (this.freezing){
      return;
    }
    this.freezing = true;
    this.trading.goto(ticker).then((trading:Trading) => {
      this.trading = trading;
      this.freezing = false;
    }).catch(error => {
      console.log(error)
      this.freezing = false;
    });
  }
}
