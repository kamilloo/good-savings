import { Injectable } from '@nestjs/common';
import {ExchangeService} from "../exchange/exchange.service";
import {CoinBalanceDto} from "../dto/CoinBalanceDto";
import {AccountBalance} from "../models/AccountBalance";
import {CoinBalance} from "../models/coin.balance";

@Injectable()
export class BalanceService {
    constructor(private readonly exchangeService:ExchangeService) {
    }
    get():Promise<any> {
        this.exchangeService.init();

        return this.exchangeService.balances().then((balances:AccountBalance) => {
            let accountBalance:CoinBalanceDto[] = [];
            for (const coin in balances) {
                if (+balances[coin].available > 0 || +balances[coin].onOrder > 0){
                    let coinBalanceDto = <CoinBalanceDto>{
                        coin: coin,
                        held: balances[coin].onOrder,
                        available: balances[coin].available,
                        total: +balances[coin].onOrder +balances[coin].available,
                    };
                    accountBalance.push(coinBalanceDto)
                }
            }
            return accountBalance;
        }).catch(error =>{
            console.log(error.message)
            return [];
        })
    }
}
