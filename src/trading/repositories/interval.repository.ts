import { Injectable } from '@nestjs/common';
import { Interval } from '../../models/Interval';
import { IntervalType } from '../../models/Enums/interval.type';

@Injectable()
export class IntervalRepository {
  private resource: Interval[] = [
    // { type: IntervalType.ONE_MINUTE, length_ms: 60 * 1 * 1000 } as Interval,
    {
      type: IntervalType.FIFTEEN_MINUTE,
      length_ms: 60 * 15 * 1000,
    } as Interval,
    { type: IntervalType.THIRTY_MINUTE, length_ms: 60 * 30 * 1000 } as Interval,
    { type: IntervalType.ONE_HOUR, length_ms: 60 * 60 * 1000 } as Interval,
  ];

  getall(): Interval[] {
    return this.resource;
  }

  getByType(type: string): Interval {
    return this.resource.find((interval: Interval) => interval.type == type);
  }
}
