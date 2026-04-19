import { describe, it, expect } from 'vitest';
import { evaluateVisibility } from '../utils/visibilityEvaluator';
import type { MockUserProfile, VisibilityRule } from '../types/template';

const profile: MockUserProfile = {
  name: 'Alice',
  tier: 'premium',
  region: 'us-west',
  features: { showCharts: true, showTable: false, level: 3 },
};

describe('evaluateVisibility', () => {
  it('returns true when no rule provided', () => {
    expect(evaluateVisibility(undefined, profile)).toBe(true);
  });

  it('== operator matches correctly', () => {
    expect(evaluateVisibility({ op: '==', path: 'tier', value: 'premium' }, profile)).toBe(true);
    expect(evaluateVisibility({ op: '==', path: 'tier', value: 'free' }, profile)).toBe(false);
  });

  it('!= operator works', () => {
    expect(evaluateVisibility({ op: '!=', path: 'tier', value: 'free' }, profile)).toBe(true);
    expect(evaluateVisibility({ op: '!=', path: 'tier', value: 'premium' }, profile)).toBe(false);
  });

  it('in operator works with arrays', () => {
    const rule: VisibilityRule = { op: 'in', path: 'tier', value: ['free', 'premium'] };
    expect(evaluateVisibility(rule, profile)).toBe(true);
    const rule2: VisibilityRule = { op: 'in', path: 'tier', value: ['enterprise'] };
    expect(evaluateVisibility(rule2, profile)).toBe(false);
  });

  it('notIn operator works', () => {
    expect(evaluateVisibility({ op: 'notIn', path: 'tier', value: ['enterprise'] }, profile)).toBe(true);
    expect(evaluateVisibility({ op: 'notIn', path: 'tier', value: ['premium'] }, profile)).toBe(false);
  });

  it('truthy operator works', () => {
    expect(evaluateVisibility({ op: 'truthy', path: 'features.showCharts' }, profile)).toBe(true);
    expect(evaluateVisibility({ op: 'truthy', path: 'features.showTable' }, profile)).toBe(false);
  });

  it('falsy operator works', () => {
    expect(evaluateVisibility({ op: 'falsy', path: 'features.showTable' }, profile)).toBe(true);
    expect(evaluateVisibility({ op: 'falsy', path: 'features.showCharts' }, profile)).toBe(false);
  });

  it('resolves nested path correctly', () => {
    expect(evaluateVisibility({ op: '==', path: 'features.showCharts', value: true }, profile)).toBe(true);
  });

  it('returns true for unknown op', () => {
    expect(evaluateVisibility({ op: 'unknown' as never, path: 'tier' }, profile)).toBe(true);
  });
});
