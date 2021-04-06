import { Injectable } from '@nestjs/common';
import { Binance } from 'node-binance-api';
import { AccountBalance } from '../models/AccountBalance';
import {Ticker} from "../models/Ticker";
import events, {EventEmitter} from "events";

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
}
