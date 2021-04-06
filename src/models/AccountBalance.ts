import { CoinBalance } from './coin.balance';

export interface AccountBalance {
  [key: string]: CoinBalance;
}
