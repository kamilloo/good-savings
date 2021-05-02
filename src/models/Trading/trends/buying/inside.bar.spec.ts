import { PinBar } from './pin.bar';
import { Candle } from '../../../candle';
import { Ticker } from '../../../ticker';
import { InsideBar } from './inside.bar';

describe('buying inside bar', () => {
  let trend: PinBar;
  let candles: Candle[] = [];
  const ticker: Ticker = { close: '10' };

  beforeEach(async () => {
    trend = new InsideBar();
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

  it('breakout candle not found', () => {
    candles = [
      createBullish('2', '4', '1', '3'),
      createBullish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('breakout candle found but wasnt bullish mother bar', () => {
    candles = [
      createBearish('6', '9', '1', '4'),
      createBullish('4', '4', '4', '4'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('breakout candle found but wasnt mother bar', () => {
    candles = [
      createBullish('4', '11', '1', '6'),
      createBullish('4', '9', '2', '6'),
      createBullish('4', '4', '1', '4'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('breakout candle found as last one', () => {
    candles = [
      createBullish('4', '11', '1', '6'),
      createBullish('4', '11', '1', '6'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('mother bar found as last one', () => {
    candles = [
      createBullish('4', '11', '1', '6'),
      createBullish('4', '9', '1', '6'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('inside bar found', () => {
    candles = [
      createBullish('4', '11', '1', '6'),
      createBullish('4', '9', '1', '6'),
      createBullish('4', '4', '4', '4'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeTruthy();
  });

  it('inside bar not found', () => {
    candles = [
      createBullish('4', '11', '1', '6'),
      createBullish('4', '8', '2', '6'),
      createBullish('4', '4', '4', '4'),
      createBullish('4', '4', '1', '4'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('inside bar not found 2', () => {
    candles = [
      createBullish('4', '11', '1', '6'),
      createBullish('4', '8', '2', '6'),
      createBullish('4', '4', '1', '4'),
      createBullish('4', '4', '4', '4'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
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
