import {Controller, Get, Res} from '@nestjs/common';
import {Response} from "express";
import {OrderService} from "./order.service";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    index(@Res() res: Response) {

        this.orderService.get().then(orders => {
            res.render('orders/index', {
                data: {
                    card: 'Orders',
                    message: 'Order List',
                    orders: orders
                }
            });
        })

    }


    @Get('opens')
    open(@Res() res: Response) {

        this.orderService.getOpen().then(orders => {
            res.render('orders/index', {
                data: {
                    card: 'Open Orders',
                    message: 'Open Order List',
                    orders: orders
                }
            });
        })

    }
}
