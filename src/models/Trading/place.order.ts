import {Ticker} from "../ticker";
import {Order} from "../order";
import {ExchangeService} from "../../exchange/exchange.service";
import {Trade} from "../trade";

export class PlaceOrder {

    private symbol:string = 'BCHUSDT';

    place(limit:number, quantity:number):Promise<Order>{

        let exchange:ExchangeService = new ExchangeService();
        exchange.init();
        return exchange.buy(this.symbol, limit, quantity)
            .then((order) => order);
            //     orderId: 4480717,
    }


    placeSell(limit:number, quantity:number):Promise<Order>{

        let exchange:ExchangeService = new ExchangeService();
        exchange.init();
        return exchange.sell(this.symbol, limit, quantity)
            .then((order) => order);
        //     orderId: 4480717,
    }



    sync(order:Order):Promise<Order>{
        let exchange:ExchangeService = new ExchangeService();
        exchange.init();
        return exchange.orderStatus(this.symbol, order.orderId)
            .then((orderStatus) => {
                order.status = orderStatus;
                return order
            }).then(order => exchange.trades(order.symbol))
            .then((trades:Trade[]) => {
                const trade = trades.find((trade, index) => {
                    return trade.orderId == order.orderId
                })
                if (trade != undefined){
                    order.price = trade.price
                }
                return order;
            });
            }
}
