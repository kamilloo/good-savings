import {Ticker} from "../ticker";

export class HigherSell {

    private bounce:number = 2;

    check(ticker:Ticker, limit:number):number{
        if (+ticker.close - this.bounce > limit){
            return +ticker.close - this.bounce;
        }
        return limit;
    }
}
