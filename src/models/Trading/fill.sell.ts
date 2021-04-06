import {Ticker} from "../ticker";

export class FillSell {

    check(ticker:Ticker, limit:number):boolean{
        return +ticker.close > limit  * .9;
    }
}
