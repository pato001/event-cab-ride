import { describe, expect, it } from 'vitest';
import { Cab, sortCabsList } from '../CabServicePage';

describe('Pre-check', () => {
  it('sort by eta', () => {
    const cabs = [

      {
        id: '3',
        eta: 5,
      } as unknown as Cab,
      {
        id: '2',
        eta: 0,
      } as unknown as Cab,
      {
        id: '4',
        eta: 10,
      } as unknown as Cab
    ]
    const result = sortCabsList(cabs)
    expect(result).toEqual([
      {
        id: '2',
        eta: 0,
      },
      {
        id: '3',
        eta: 5,
      },
      {
        id: '4',
        eta: 10,
      }
    ]);
  });
});