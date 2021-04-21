import { Injectable } from '@nestjs/common';
import {Candle} from "../../models/candle";

@Injectable()
export class CandleRepository {

    private candles: Candle[] = [];

    constructor() {
    }

    get():Candle[]{
        return [];
    }

    getLast():Candle{
        return <Candle>{}
    }
    add(candle:Candle):boolean{
        return true;
    }
}
