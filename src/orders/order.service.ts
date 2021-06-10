import { Injectable } from '@nestjs/common';
import {ExchangeService} from "../exchange/exchange.service";
import {CoinBalanceDto} from "../dto/CoinBalanceDto";
import {AccountBalance} from "../models/AccountBalance";
import {CoinBalance} from "../models/coin.balance";
import {Order} from "../models/order";

@Injectable()
export class OrderService {
    constructor(private readonly exchangeService:ExchangeService) {
    }

    get():Promise<any> {
        this.exchangeService.init();

        return this.exchangeService.orders('BCHUSDT').then((orders:Order[]) => {
            // let accountBalance:CoinBalanceDto[] = [];
            return orders.map((order) => {
                return {
                    orderId: order.orderId,
                    symbol: order.symbol,
                    price: order.price,
                    origQty: order.origQty,
                    status: order.status,
                    type: order.type,
                    side: order.side,
                    updateTime: new Date(order.updateTime).toLocaleString(),
                    time: new Date(order.time).toUTCString(),
                }
            })
        })
    }

    getOpen():Promise<any> {
        this.exchangeService.init();

        return this.exchangeService.openOrders('BCHUSDT').then((orders:Order[]) => {
            return orders.map((order) => {
                return {
                    orderId: order.orderId,
                    symbol: order.symbol,
                    price: order.price,
                    origQty: order.origQty,
                    status: order.status,
                    type: order.type,
                    side: order.side,
                    updateTime: new Date(order.updateTime).toLocaleString(),
                    time: new Date(order.time).toUTCString(),
                }
            })
        })
    }
}
