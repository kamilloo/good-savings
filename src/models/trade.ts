/**
 * @example:
 symbol: 'BCHUSDT',
 id: 59791610,
 orderId: 1411526965,
 orderListId: -1,
 price: '499.00000000',
 qty: '1.00000000',
 quoteQty: '499.00000000',
 commission: '0.49900000',
 commissionAsset: 'USDT',
 time: 1614296951027,
 isBuyer: false,
 isMaker: true,
 isBestMatch: true

 */
export interface Trade {
  symbol: string;
  id: number;
  orderId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string,
  commissionAsset: string,
  time: number,
  isBuyer: boolean,
  isMaker: boolean,
  isBestMatch: boolean
}
