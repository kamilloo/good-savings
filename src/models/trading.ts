import {Ticker} from "./ticker";

export abstract class Trading {
  constructor() {
    console.log(this);
  }
  abstract goto(ticker:Ticker): Promise<Trading>;
}
