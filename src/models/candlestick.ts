/**
 * @example:
 {
    e:eventType,
    E:eventTime,
    s:symbol,
    k:ticks;
 }

 */
import {CandlestickPayload} from "./candlestick.payload";

export interface Candlestick {
  e:string;
  E:string;
  s:string;
  k:CandlestickPayload;
}


