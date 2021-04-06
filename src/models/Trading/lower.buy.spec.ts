import {ShouldBuy} from "./should.buy";
import {Ticker} from "../Ticker";
import {LowerBuy} from "./lower.buy";

describe('Lower buy', () => {
  let service: LowerBuy;

  beforeEach(async () => {
    service = new LowerBuy();
  });

  it('not lower buy', () => {

    let ticker:Ticker;

    ticker = <any>{
      close: 100,
    }

    let limit = 100;

    let lower = service.check(ticker, limit);

    expect(lower).toBe(limit);
  });

  it('lower buy', () => {

    let ticker:Ticker;

    ticker = <any>{
      close: 70,
    }

    let limit = 100;

    let lower = service.check(ticker, limit);

    expect(lower).toBe(80);

  });
});
