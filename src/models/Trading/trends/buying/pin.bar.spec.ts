import { PinBar } from './pin.bar';
import { Candle } from '../../../candle';

describe('buying pin bar', () => {
  let trend: PinBar;
  let candles: Candle[] = [];

  beforeEach(async () => {
    trend = new PinBar();
  });

  it('not bearish found', () => {
    candles = [];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('last is final', () => {
    candles = [createBullish('2', '4', '1', '3')];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('one before previous candle was bullish', () => {
    candles = [
      createBullish('2', '4', '1', '3'),
      createBullish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('pin bar not found in bullish', () => {
    candles = [
      createBearish('300', '400', '250', '280'),
      createBullish('255', '350', '200', '290'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('pin bar not found in bearisch', () => {
    candles = [
      createBearish('300', '400', '250', '280'),
      createBullish('290', '350', '200', '260'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('pin bar found in bullish', () => {
    candles = [
      createBearish('300', '400', '250', '280'),
      createBullish('280', '350', '200', '290'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeTruthy();
  });

  it('pin bar found in bearish', () => {
    candles = [
      createBearish('300', '400', '250', '280'),
      createBearish('290', '350', '200', '280'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeTruthy();
  });

  it('pin low not enough', () => {
    candles = [
      createBearish('300', '400', '250', '280'),
      createBullish('280', '350', '250', '290'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

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
