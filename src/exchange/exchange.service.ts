import { Injectable } from '@nestjs/common';
import { Binance } from 'node-binance-api';
import { AccountBalance } from '../models/AccountBalance';
import {Ticker} from "../models/ticker";
import events, {EventEmitter} from "events";
import {Order} from "../models/order";
import {Trade} from "../models/trade";

@Injectable()
export class ExchangeService extends EventEmitter{
    private binance: Binance;

    init(){
        const Binance = require('node-binance-api')
        this.binance = new Binance().options({
        });
    }

    balances():Promise<AccountBalance>{
        return new Promise<AccountBalance>((resolve, reject) => {
            this.binance.balance((error, balances) => {
                if ( error ) return reject(error);
                resolve(balances);
            });
        })
    }

    ticker(coin: string):Promise<Ticker> {
        return new Promise<Ticker>((resolve, reject) => {
            this.binance.websockets.prevDay(coin, (error, ticker) => {
                if (error) return reject(error)
                this.emit('ticker', ticker)
                resolve(ticker)
            })
        })
    }

    buy(symbol: string, limit:number, quantity:number):Promise<Order> {
        return new Promise<Order>((resolve, reject) => {
            this.binance.buy(symbol, quantity, limit + 2, {type:'LIMIT'}, (error, response) => {
                if ( error ) return reject(error);
                resolve(response);
            });
        })
    }

    sell(symbol: string, limit:number, quantity:number):Promise<Order> {
        return new Promise<Order>((resolve, reject) => {
            this.binance.sell(symbol, quantity, limit - 2, {type:'LIMIT'}, (error, response) => {
                if ( error ) return reject(error);
                resolve(response);
            });
        })
    }

    orderStatus(symbol: string, orderId: number):Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.binance.orderStatus(symbol, orderId, (error, order, symbol) => {
                if ( error ) return reject(error);
                resolve(order.status);
            });
        })
    }

    orders(symbol: string):Promise<Order[]> {
        return new Promise<Order[]>((resolve, reject) => {
            let startTime = Date.now() - 2*24*60*60*1000;
            this.binance.allOrders(symbol, (error, orders, symbol) => {
                if (error) return reject(error);
                resolve(orders);
            }, {
                startTime: startTime,
                limit: 50,
            });
        })
    }


    openOrders(symbol: string):Promise<Order[]> {
        return new Promise<Order[]>((resolve, reject) => {
            this.binance.openOrders(symbol, (error, orders, symbol) => {
                if (error) return reject(error);
                resolve(orders);
            });
        })
    }

    trades(symbol: string):Promise<Trade[]> {
        return new Promise<Trade[]>((resolve, reject) => {
            let startTime = Date.now() - 12*60*60*1000;
            this.binance.trades(symbol, (error, trades, symbol) => {
                if (error) return reject(error);
                resolve(trades);
            }, {
                startTime: startTime,
                limit: 50,
            });
        })
    }
}
