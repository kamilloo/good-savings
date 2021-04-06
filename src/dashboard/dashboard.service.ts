import { Injectable } from '@nestjs/common';
import {CoinRateDto} from "../Dto/CoinRateDto";
import {ExchangeService} from "../exchange/exchange.service";
import {Ticker} from "../models/ticker";

@Injectable()
export class DashboardService {

    private coin = 'BCHUSDT';

    private ticker:Ticker;

    constructor(private readonly exchangeService:ExchangeService) {
        this.exchangeService.init()

        this.exchangeService.ticker(this.coin).then((tickerPrices) => {
            this.ticker = tickerPrices;
        })


        this.exchangeService.on('ticker', (ticker) => {
            this.ticker = ticker;
        })
    }
    getRate():CoinRateDto{
        return <CoinRateDto>{
            coin: this.coin,
            rate: this.ticker ? this.ticker.close : 0.0
        }
    }
}
