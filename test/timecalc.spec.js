import { describe, it, expect } from 'vitest';
import { hoursBetween, applyAutoBreak } from '../src/lib/timecalc';

describe('timecalc', () => {
  it('computes hours between times', () => {
    expect(hoursBetween('08:00', '12:00')).toBeCloseTo(4);
    expect(hoursBetween('22:00', '02:00')).toBeCloseTo(4);
  });

  it('applies auto break correctly', () => {
    expect(applyAutoBreak(6.5, 6, 30)).toBeCloseTo(6);
    expect(applyAutoBreak(5.5, 6, 30)).toBeCloseTo(5.5);
  });
});
