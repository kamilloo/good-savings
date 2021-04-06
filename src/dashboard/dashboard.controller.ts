import {Controller, Get, Res} from '@nestjs/common';
import {Response} from "express";
import {DashboardService} from "./dashboard.service";
import {CoinRateDto} from "../Dto/CoinRateDto";

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService:DashboardService) {
    }
    @Get()
    root(@Res() res: Response) {
        const coinRate:CoinRateDto = this.dashboardService.getRate();
        res.render('dashboard/index', {data: coinRate});

    }
}
