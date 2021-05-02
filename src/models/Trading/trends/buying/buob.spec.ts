import { PinBar } from './pin.bar';
import { Candle } from '../../../candle';
import { Buob } from './buob';
import { Ticker } from '../../../ticker';

describe('selling buob', () => {
  let trend: Buob;
  let candles: Candle[] = [];
  const ticker: Ticker = { close: '1' };

  beforeEach(async () => {
    trend = new Buob();
  });

  it('not bearish found', () => {
    candles = [];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('last is final', () => {
    candles = [createBullish('2', '4', '1', '3')];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('one before previous candle was bullish', () => {
    candles = [
      createBullish('2', '4', '1', '3'),
      createBullish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous has lower high than one before previous candle', () => {
    candles = [
      createBearish('2', '10', '1', '3'),
      createBullish('6', '8', '1', '1'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous has lower low than one before previous candle', () => {
    candles = [
      createBearish('300', '500', '200', '280'),
      createBullish('500', '550', '250', '200'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('buob not found in bearish', () => {
    candles = [
      createBearish('300', '400', '250', '280'),
      createBearish('250', '500', '200', '240'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('beob found in bearish', () => {
    candles = [
      createBearish('280', '400', '250', '300'),
      createBullish('280', '450', '200', '290'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeTruthy();
  });

  function createBearish(
    open: string,
    high: string,
    low: string,
    close: string,
  ): Candle {
    return <Candle>{
      open: open,
      high: high,
      low: low,
      close: close,
      volume: '100',
      isFinal: true,
      isBullish: false,
    };
  }
  function createBullish(
    open: string,
    high: string,
    low: string,
    close: string,
  ): Candle {
    return <Candle>{
      open: open,
      high: high,
      low: low,
      close: close,
      volume: '100',
      isFinal: true,
      isBullish: true,
    };
  }

  function createNotFinalCandle(): Candle {
    return <Candle>{
      isFinal: false,
    };
  }
});
