/**
 * @example:
 symbol: 'BNBETH',
 orderId: 4480717,
 clientOrderId: 'te38xGILZUXrPZHnTQPH6h',
 transactTime: 1509049732437,
 price: '0.00402030',
 origQty: '5.00000000',
 executedQty: '5.00000000',
 status: 'FILLED',
 timeInForce: 'GTC',
 type: 'LIMIT',
 side: 'BUY'
 */
export interface Order {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
}
