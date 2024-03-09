import { IntervalType } from './Enums/interval.type';
import { CoinPair } from './CoinPair';

export interface Subsciption {
  symbol: CoinPair;
  interval: IntervalType;
  quote: string;
}
