import { PinBar } from './pin.bar';
import { Candle } from '../../../candle';

describe('selling pin bar', () => {
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

  it('one before previous candle was bearich', () => {
    candles = [
      createBearish('3', '4', '1', '2'),
      createBullish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('previous on close above one before previous candle', () => {
    candles = [
      createBullish('3', '4', '1', '2'),
      createBullish('2', '4', '1', '5'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('pin bar not found in bullish', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBullish('255', '350', '200', '290'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('pin bar not found in bearisch', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBullish('290', '350', '200', '260'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeFalsy();
  });

  it('pin bar found in bullish', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBullish('280', '450', '200', '290'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeTruthy();
  });

  it('pin bar found in bearish', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBearish('290', '450', '200', '280'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles);

    expect(checked).toBeTruthy();
  });

  it('pin low not enough', () => {
    candles = [
      createBullish('300', '400', '250', '280'),
      createBullish('280', '350', '240', '290'),
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
