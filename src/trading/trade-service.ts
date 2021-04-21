import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../exchange/exchange.service';
import {Ticker} from "../models/ticker";
import {Trader} from "../models/trader";
import {Quote} from "../models/quote";
import {Candle} from "../models/candle";
import {Candlestick} from "../models/candlestick";

@Injectable()
export class TradeService {

    private coin = 'BCHUSDT';

    private ticker:Ticker;

    private trader:Trader;

    private candles: Candle[] = [];

    constructor(private readonly exchangeService:ExchangeService) {
        this.exchangeService.init()
        this.exchangeService.ticker(this.coin).then((ticker) => {})
        this.exchangeService.candles(this.coin).then((candlestick) => {})
        this.initial()

    }

    // initial(trader:Trader){
    initial(){
        this.trader = new Trader(new Quote(671, 0.04));

        this.exchangeService.on('ticker', (ticker) => {
            this.trigger(ticker);
        })

        this.exchangeService.history(this.coin).then((history:[string: Candle]) => {
            for (const time in history) {
                let candle:Candle = history[time];
                candle.time = +time;
                this.candles.push(candle)
            }
        })

        this.exchangeService.on('candlesticks', (candlesticks:Candlestick) => {
            // this.candles.push(candlesticks)
            console.log(candlesticks)
        })
    }

    trigger(ticker:Ticker){
        this.trader.call(ticker)
    }
}
