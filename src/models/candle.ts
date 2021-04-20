/**
 * @example:
 {
      open: '0.00100090',
     high: '0.00100650',
     low: '0.00099810',
     close: '0.00100370',
     volume: '1161.52000000'
 }

 */
export interface Candle {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  time: number;
}


