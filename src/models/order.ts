/**
 * @example:
 symbol: 'BNBETH',
 orderId: 4480717,
 clientOrderId: 'te38xGILZUXrPZHnTQPH6h',
 transactTime: 1509049732437,
 price: '0.00402030',
 origQty: '5.00000000',
 executedQty: '5.00000000',
 cummulativeQuoteQty: '1911.02524200',
 status: 'FILLED',
 timeInForce: 'GTC',
 type: 'LIMIT',
 side: 'BUY',
 time: 1616936013802,
 updateTime: 1616936086009,
 isWorking: true,
 origQuoteOrderQty: '0.00000000'

 */

export interface Order {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string,
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  time: number,
  updateTime: number,
  isWorking: boolean,
  origQuoteOrderQty: string,
}
