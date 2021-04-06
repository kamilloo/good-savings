import {Ticker} from "../ticker";

export class LowerBuy {

    private bounce:number = 10;

    check(ticker:Ticker, limit:number):number{
        if (+ticker.close + this.bounce < limit){
            return +ticker.close + this.bounce;
        }
        return limit;
    }
}
