import { Injectable } from '@nestjs/common';
import {ExchangeService} from "../exchange/exchange.service";
import {Ticker} from "../models/ticker";
import {Trader} from "../models/trader";
import {Base} from "../models/base";
import {Quote} from "../models/quote";

@Injectable()
export class TradeService {

    private coin = 'BCHUSDT';

    private ticker:Ticker;

    private trader:Trader;

    constructor(private readonly exchangeService:ExchangeService) {
        this.exchangeService.init()
        this.exchangeService.ticker(this.coin).then((ticker) => {})
        this.initial()

    }

    // initial(trader:Trader){
    initial(){
        this.trader = new Trader(new Base(632, 0.05));

        this.exchangeService.on('ticker', (ticker) => {
            this.trigger(ticker);
        })
    }

    trigger(ticker:Ticker){
        this.trader.call(ticker)
    }
}
