import {Controller, Get, Res} from '@nestjs/common';
import {Response} from "express";
import {TradeService} from "./trade.service";

@Controller('trades')
export class TradeController {
    constructor(private readonly tradeService: TradeService) {}

    @Get()
    index(@Res() res: Response) {

        this.tradeService.get().then(trades => {
            res.render('trades/index', {
                data: {
                    card: 'Trades',
                    message: 'Trades List',
                    trades: trades
                }
            });
        })

    }

}
