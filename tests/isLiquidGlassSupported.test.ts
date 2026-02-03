import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('isLiquidGlassSupported', () => {
  it('returns false when CSS is missing', async () => {
    vi.stubGlobal('CSS', undefined);
    vi.resetModules();

    const { isLiquidGlassSupported } = await import(
      '../src/utils/isLiquidGlassSupported'
    );

    expect(isLiquidGlassSupported).toBe(false);
  });

  it('returns true when backdrop-filter is supported', async () => {
    vi.stubGlobal('CSS', {
      supports: (property: string) => property === 'backdrop-filter'
    });
    vi.resetModules();

    const { isLiquidGlassSupported } = await import(
      '../src/utils/isLiquidGlassSupported'
    );

    expect(isLiquidGlassSupported).toBe(true);
  });
});
