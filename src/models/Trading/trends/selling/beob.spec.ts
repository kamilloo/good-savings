import { PinBar } from './pin.bar';
import { Candle } from '../../../candle';
import { Beob } from './beob';
import { Ticker } from '../../../ticker';

describe('selling beob', () => {
  let trend: Beob;
  let candles: Candle[] = [];
  const ticker: Ticker = { close: '1' };

  beforeEach(async () => {
    trend = new Beob();
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

  it('one before previous candle was bearich', () => {
    candles = [
      createBearish('3', '4', '1', '2'),
      createBullish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous has lower high than one before previous candle', () => {
    candles = [
      createBullish('3', '4', '1', '2'),
      createBearish('6', '10', '1', '1'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous has lower low than one before previous candle', () => {
    candles = [
      createBullish('300', '400', '200', '280'),
      createBearish('500', '500', '250', '200'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('beob not found in bearisch', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBullish('250', '500', '200', '260'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('beob found in bearish', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBearish('290', '450', '200', '280'),
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
