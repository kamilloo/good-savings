import {Ticker} from "../ticker";

export class ShouldSell {

    check(ticker:Ticker, limit:number):boolean{
        return +ticker.close < limit;
    }
}
