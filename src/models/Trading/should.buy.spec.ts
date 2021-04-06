import {ShouldBuy} from "./should.buy";
import {Ticker} from "../ticker";

describe('Should buy', () => {
  let service: ShouldBuy;

  beforeEach(async () => {
    service = new ShouldBuy();
  });

  it('should not buy', () => {

    let ticker:Ticker;

    ticker = <any>{
      close: 100,
    }

    let limit = 100;

    let checked = service.check(ticker, limit);

    expect(checked).toBeFalsy();
  });

  it('should  buy', () => {

    let ticker:Ticker;

    ticker = <any>{
      close: 110,
    }

    let limit = 100;

    let checked = service.check(ticker, limit);

    expect(checked).toBeTruthy();
  });
});
