import { Injectable } from '@nestjs/common';
import {ExchangeService} from "../exchange/exchange.service";
import {Trade} from "../models/trade";

@Injectable()
export class TradeService {
    constructor(private readonly exchangeService:ExchangeService) {
    }

    get():Promise<any> {
        this.exchangeService.init();
        return this.exchangeService.trades('BCHUSDT').then((trades:Trade[]) => {
            return trades.map((trade) => {
                return {
                    symbol: trade.symbol,
                    id: trade.id,
                    orderId: trade.orderId,
                    price: trade.price,
                    qty: trade.qty,
                    quoteQty: trade.quoteQty,
                    commission: trade.commission,
                    commissionAsset: trade.commissionAsset,
                    time: new Date(trade.time).toLocaleString(),
                }
            })
        })
    }
}
