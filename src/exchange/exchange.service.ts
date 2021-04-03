import { Injectable } from '@nestjs/common';
import { Binance } from 'node-binance-api';
import { AccountBalance } from '../models/AccountBalance';

@Injectable()
export class ExchangeService {
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

}
