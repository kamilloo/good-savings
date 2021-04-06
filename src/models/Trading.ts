import {Ticker} from "./Ticker";

export interface Trading {
  goto(ticker:Ticker): Trading;
}
