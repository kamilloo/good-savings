import { PinBar } from './pin.bar';
import { Candle } from '../../../candle';
import { Beob } from './beob';
import { Ticker } from '../../../ticker';
import { ShootingStar } from './shooting.star';

describe('selling shooting star', () => {
  let trend: ShootingStar;
  let candles: Candle[] = [];
  const ticker: Ticker = { close: '1' };

  beforeEach(async () => {
    trend = new ShootingStar();
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
      createBearish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous candle was bullish', () => {
    candles = [
      createBullish('2', '4', '1', '3'),
      createBullish('2', '4', '1', '3'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous previous candle was to large body', () => {
    candles = [
      createBullish('3', '4', '1', '2'),
      createBearish('6', '10', '1', '1'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous previous low wick was to low', () => {
    candles = [
      createBullish('3', '4', '1', '2'),
      createBearish('6', '10', '1', '5'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('previous previous high wick was to low', () => {
    candles = [
      createBullish('3', '4', '1', '2'),
      createBearish('6', '7', '5', '5'),
      createNotFinalCandle(),
    ];
    const checked = trend.check(candles, ticker);

    expect(checked).toBeFalsy();
  });

  it('shooting star found', () => {
    candles = [
      createBullish('1681.80', '1699.93', '1679.61', '1698.84'),
      createBearish('1698.84', '1718.48', '1693.47', '1694.47'),
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
