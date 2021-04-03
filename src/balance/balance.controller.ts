import {Controller, Get, Res} from '@nestjs/common';
import {Response} from "express";
import {BalanceService} from "./balance.service";

@Controller('balances')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) {}

    @Get()
    root(@Res() res: Response) {

        this.balanceService.get().then(balances => {
            res.render('balances/index', {data: balances});
        })

    }
}
