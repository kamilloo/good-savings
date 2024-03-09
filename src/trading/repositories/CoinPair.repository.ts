import { Injectable } from '@nestjs/common';
import { CoinPair } from '../../models/CoinPair';

@Injectable()
export class CoinPairRepository {
  private resource: CoinPair[] = [
    { name: 'shibusdt' } as CoinPair,
    { name: 'dogeusdt' } as CoinPair,
    { name: 'pepeusdt' } as CoinPair,
    { name: 'arusdt' } as CoinPair,
    { name: 'arkusdt' } as CoinPair,
    { name: 'spellusdt' } as CoinPair,
    { name: 'jasmyusdt' } as CoinPair,
    { name: 'synusdt' } as CoinPair,
    { name: 'superusdt' } as CoinPair,
    { name: 'storjusdt' } as CoinPair,
    { name: 'powrusdt' } as CoinPair,
    { name: 'mantausdt' } as CoinPair,
    { name: 'thetausdt' } as CoinPair,
    { name: 'galusdt' } as CoinPair,
    { name: 'diausdt' } as CoinPair,
    { name: 'vidtusdt' } as CoinPair,
    { name: 'keyusdt' } as CoinPair,
    { name: 'forusdt' } as CoinPair,
    { name: 'fidausdt' } as CoinPair,
    { name: 'eduusdt' } as CoinPair,
    { name: 'alcxusdt' } as CoinPair,
    { name: 'degousdt' } as CoinPair,
    { name: 'umausdt' } as CoinPair,
    { name: 'arkmusdt' } as CoinPair,
    { name: 'sysusdt' } as CoinPair,
  ];

  getall(): CoinPair[] {
    return this.resource;
  }
}
