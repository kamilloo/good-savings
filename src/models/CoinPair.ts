import { Coin } from './Coin';

export interface CoinPair {
  name: string;
  base: Coin;
  quote: Coin;
}
