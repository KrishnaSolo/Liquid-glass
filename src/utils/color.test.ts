import { describe, it, expect } from 'vitest';
import { parseColor, toRgba, applyTintToBackground } from './color';

describe('color utilities', () => {
  describe('parseColor', () => {
    describe('hex colors', () => {
      it('parses 3-digit hex colors', () => {
        const result = parseColor('#f00');
        expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      });

      it('parses 4-digit hex colors (with alpha)', () => {
        const result = parseColor('#f008');
        expect(result).toEqual({ r: 255, g: 0, b: 0, a: expect.closeTo(0.533, 2) });
      });

      it('parses 6-digit hex colors', () => {
        const result = parseColor('#ff6b6b');
        expect(result).toEqual({ r: 255, g: 107, b: 107, a: 1 });
      });

      it('parses 8-digit hex colors (with alpha)', () => {
        const result = parseColor('#ff6b6b80');
        expect(result).toEqual({ r: 255, g: 107, b: 107, a: expect.closeTo(0.502, 2) });
      });

      it('returns null for invalid hex', () => {
        expect(parseColor('#gg0000')).toBeNull();
        expect(parseColor('#12')).toBeNull();
        expect(parseColor('#12345')).toBeNull();
      });
    });

    describe('rgb/rgba colors', () => {
      it('parses rgb colors', () => {
        const result = parseColor('rgb(255, 100, 50)');
        expect(result).toEqual({ r: 255, g: 100, b: 50, a: 1 });
      });

      it('parses rgba colors', () => {
        const result = parseColor('rgba(255, 100, 50, 0.5)');
        expect(result).toEqual({ r: 255, g: 100, b: 50, a: 0.5 });
      });

      it('parses rgb with spaces', () => {
        const result = parseColor('rgb( 100 , 200 , 150 )');
        expect(result).toEqual({ r: 100, g: 200, b: 150, a: 1 });
      });
    });

    describe('special values', () => {
      it('parses transparent', () => {
        const result = parseColor('transparent');
        expect(result).toEqual({ r: 0, g: 0, b: 0, a: 0 });
      });

      it('returns null for named colors (not implemented)', () => {
        expect(parseColor('red')).toBeNull();
        expect(parseColor('blue')).toBeNull();
      });

      it('returns null for invalid formats', () => {
        expect(parseColor('not-a-color')).toBeNull();
        expect(parseColor('')).toBeNull();
      });
    });
  });

  describe('toRgba', () => {
    it('converts components to rgba string', () => {
      expect(toRgba(255, 100, 50, 1)).toBe('rgba(255, 100, 50, 1)');
    });

    it('handles fractional alpha', () => {
      expect(toRgba(0, 0, 0, 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    });

    it('handles zero values', () => {
      expect(toRgba(0, 0, 0, 0)).toBe('rgba(0, 0, 0, 0)');
    });
  });

  describe('applyTintToBackground', () => {
    it('returns base background when no tint provided', () => {
      const base = 'rgba(255, 255, 255, 0.25)';
      expect(applyTintToBackground(base, undefined)).toBe(base);
    });

    it('returns tinted background with hex color', () => {
      const result = applyTintToBackground('rgba(255, 255, 255, 0.25)', '#ff6b6b');
      expect(result).toMatch(/rgba\(255, 107, 107, [\d.]+\)/);
    });

    it('returns tinted background with rgba color', () => {
      const result = applyTintToBackground('rgba(255, 255, 255, 0.25)', 'rgba(100, 200, 150, 0.8)');
      expect(result).toMatch(/rgba\(100, 200, 150, [\d.]+\)/);
    });

    it('limits tint opacity to 0.4 max', () => {
      const result = applyTintToBackground('rgba(255, 255, 255, 0.25)', '#ff0000');
      // 1.0 * 0.3 = 0.3, which is less than 0.4 cap
      expect(result).toBe('rgba(255, 0, 0, 0.3)');
    });

    it('returns base background for invalid tint color', () => {
      const base = 'rgba(255, 255, 255, 0.25)';
      expect(applyTintToBackground(base, 'invalid')).toBe(base);
    });

    it('handles transparent tint', () => {
      const result = applyTintToBackground('rgba(255, 255, 255, 0.25)', 'transparent');
      expect(result).toBe('rgba(0, 0, 0, 0)');
    });
  });
});
