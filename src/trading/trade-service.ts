import { Injectable } from '@nestjs/common';
import {ExchangeService} from "../exchange/exchange.service";
import {Ticker} from "../models/Ticker";
import {Trader} from "../models/Trader";
import {Base} from "../models/Base";
import {Quote} from "../models/Quote";

@Injectable()
export class TradeService {

    private coin = 'BCHUSDT';

    private ticker:Ticker;

    private trader:Trader;

    constructor(private readonly exchangeService:ExchangeService) {
        this.exchangeService.init()
        this.exchangeService.ticker(this.coin).then((ticker) => {})

    }

    initial(trader:Trader){
        this.trader = new Trader(new Quote(500, 50));

        this.exchangeService.on('ticker', (ticker) => {
            this.trigger(ticker);
        })
    }

    trigger(ticker:Ticker){
        this.trader.call(ticker)
    }
}
