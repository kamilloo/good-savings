import { Test, TestingModule } from '@nestjs/testing';
import { CandleRepository } from './candle.repository';
import { Candle } from '../../models/candle';
import { Candlestick } from '../../models/candlestick';
import { CandlestickPayload } from '../../models/candlestick.payload';

describe('CandleRepository', () => {
  let repository: CandleRepository;

  function initDepedencies() {}

  beforeEach(async () => {
    initDepedencies();

    repository = new CandleRepository();
  });

  it('add candle to repository', function () {
    const candle: Candle = <any>{
      open: '0.00100090',
      high: '0.00100650',
      low: '0.00099810',
      close: '0.00100370',
      volume: '1161.52000000',
      time: 1000000,
    };

    const candleAdded = repository.addCandle(candle);

    expect(candleAdded).toBeTruthy();
  });

  function createCandle(time) {
    const candle: Candle = <any>{
      open: '0.00100090',
      high: '0.00100650',
      low: '0.00099810',
      close: '0.00100370',
      volume: '1161.52000000',
      time: time,
    };
    return candle;
  }
  function createCandlestick(time): Candlestick {
    const candlestick: Candlestick = <any>{
      e: 'kline',
      E: time + 1,
      s: 'symbol',
      k: createCandlestickPayload(),
    };
    return candlestick;
  }

  function createCandlestickPayload(): CandlestickPayload {
    return <CandlestickPayload>{
      o: '0.00100090',
      h: '0.00100650',
      l: '0.00099810',
      c: '0.00100370',
      v: '1161.52000000',
      n: '100',
      i: '1',
      x: 'true',
      q: '100',
      V: '100',
      Q: 'test',
    };
  }

  it('add candle to repository', function () {
    const candle = createCandle(1000000);

    const candleAdded = repository.addCandle(candle);

    const candles = repository.get();
    expect(candles.length).toBe(1);
    expect(candles[0]).toBe(candle);
  });

  it('incoming candle replace repository', function () {
    const firstCandle = createCandle(100000);
    repository.addCandle(firstCandle);
    const lastTick = 1000000;
    const previousCandle = createCandle(lastTick);
    repository.addCandle(previousCandle);

    //when
    const incomingCandle = createCandle(1000000);

    repository.addCandle(incomingCandle);

    const candles = repository.get();
    expect(candles.length).toBe(2);
    expect(candles[0]).toBe(firstCandle);
    expect(candles[1]).toBe(incomingCandle);
  });

  it('incoming candle was late', function () {
    const lateTick = 100;
    const firstCandle = createCandle(lateTick);
    repository.addCandle(firstCandle);
    const previousCandle = createCandle(200);
    repository.addCandle(previousCandle);

    const incomingCandle = createCandle(lateTick);

    repository.addCandle(incomingCandle);

    const candles = repository.get();
    expect(candles.length).toBe(2);
    expect(candles[0]).toBe(incomingCandle);
    expect(candles[1]).toBe(previousCandle);
  });

  it('incoming candlestick replace last candle', function () {
    const tickTime = 200;
    const firstCandle = createCandle(100);
    repository.addCandle(firstCandle);
    const previousCandle = createCandle(tickTime);
    repository.addCandle(previousCandle);

    const incomingCandle = createCandlestick(tickTime);

    repository.addCandlestick(incomingCandle);

    const candles = repository.get();
    expect(candles.length).toBe(2);
    expect(candles[0]).toBe(firstCandle);
    expect(candles[1].time).toBe(tickTime);
    expect(candles[1].open).toBe(incomingCandle.k.o);
    expect(candles[1].high).toBe(incomingCandle.k.h);
    expect(candles[1].low).toBe(incomingCandle.k.l);
    expect(candles[1].close).toBe(incomingCandle.k.c);
    expect(candles[1].volume).toBe(incomingCandle.k.v);
  });

  it('incoming candlestick add to candle', function () {
    const tickTime = 1200000;
    const firstCandle = createCandle(600000);
    repository.addCandle(firstCandle);
    const incomingCandle = createCandlestick(tickTime);

    repository.addCandlestick(incomingCandle);

    const candles = repository.get();
    expect(candles.length).toBe(2);
    expect(candles[0]).toBe(firstCandle);
    expect(candles[1].time).toBe(tickTime);
    expect(candles[1].open).toBe(incomingCandle.k.o);
    expect(candles[1].high).toBe(incomingCandle.k.h);
    expect(candles[1].low).toBe(incomingCandle.k.l);
    expect(candles[1].close).toBe(incomingCandle.k.c);
    expect(candles[1].volume).toBe(incomingCandle.k.v);
  });
});
