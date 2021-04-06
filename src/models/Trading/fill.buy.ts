import {Ticker} from "../ticker";

export class FillBuy {

    check(ticker:Ticker, limit:number):boolean{
        return +ticker.close < limit * 1.1;
    }
}
