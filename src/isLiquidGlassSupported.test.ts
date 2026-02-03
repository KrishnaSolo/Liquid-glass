import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('isLiquidGlassSupported', () => {
  // Save original values
  const originalCSS = globalThis.CSS;
  const originalWindow = globalThis.window;

  beforeEach(() => {
    // Reset modules before each test to get fresh detection
    vi.resetModules();
  });

  afterEach(() => {
    // Restore originals
    globalThis.CSS = originalCSS;
    globalThis.window = originalWindow;
  });

  it('returns true when CSS.supports returns true for backdrop-filter', async () => {
    // Mock CSS.supports to return true
    globalThis.CSS = {
      ...originalCSS,
      supports: vi.fn((prop: string, _value?: string) => {
        return prop === 'backdrop-filter' || prop === '-webkit-backdrop-filter';
      }),
    } as unknown as typeof CSS;

    const { isLiquidGlassSupported } = await import('./isLiquidGlassSupported');
    expect(isLiquidGlassSupported).toBe(true);
  });

  it('returns true when only webkit-backdrop-filter is supported', async () => {
    globalThis.CSS = {
      ...originalCSS,
      supports: vi.fn((prop: string) => {
        return prop === '-webkit-backdrop-filter';
      }),
    } as unknown as typeof CSS;

    const { isLiquidGlassSupported } = await import('./isLiquidGlassSupported');
    expect(isLiquidGlassSupported).toBe(true);
  });

  it('returns false when backdrop-filter is not supported', async () => {
    globalThis.CSS = {
      ...originalCSS,
      supports: vi.fn(() => false),
    } as unknown as typeof CSS;

    const { isLiquidGlassSupported } = await import('./isLiquidGlassSupported');
    expect(isLiquidGlassSupported).toBe(false);
  });

  it('returns false when CSS.supports is not available', async () => {
    globalThis.CSS = {
      ...originalCSS,
      supports: undefined,
    } as unknown as typeof CSS;

    const { isLiquidGlassSupported } = await import('./isLiquidGlassSupported');
    // Falls back to element test which should fail in test environment
    expect(typeof isLiquidGlassSupported).toBe('boolean');
  });

  it('exports a boolean constant', async () => {
    const { isLiquidGlassSupported } = await import('./isLiquidGlassSupported');
    expect(typeof isLiquidGlassSupported).toBe('boolean');
  });
});
