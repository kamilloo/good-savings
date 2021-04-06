import {ShouldBuy} from "./Trading/should.buy";
import {Ticker} from "./ticker";
import {Quote} from "./quote";
import {Buying} from "./buying";

describe('quote', () => {
  let service: Quote;

  beforeEach(async () => {
    service = new Quote(100,100);
  });

  it('should not sell', () => {

    let ticker:Ticker;

    ticker = <any>{
      close: 100,
    }


    return service.goto(ticker).then(state => {
      expect(state).toBeInstanceOf(Quote);
    });

  });

  it('should  sell', () => {

    let ticker:Ticker;

    ticker = <any>{
      close: 110,
    }


    return service.goto(ticker).then(state => {
      expect(state).toBeInstanceOf(Buying);
    });

  });
});
