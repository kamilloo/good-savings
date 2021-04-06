import {Ticker} from "../Ticker";

export class ShouldBuy {

    check(ticker:Ticker, limit:number):boolean{
        return +ticker.close > limit;
    }
}
