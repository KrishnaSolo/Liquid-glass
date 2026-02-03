import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGlassEffect } from './useGlassEffect';

describe('useGlassEffect', () => {
  describe('effect styles', () => {
    describe('regular effect', () => {
      it('returns regular blur styles for light scheme', () => {
        const { result } = renderHook(() =>
          useGlassEffect({ effect: 'regular', colorScheme: 'light' })
        );

        expect(result.current.styles.backdropFilter).toBe('blur(20px) saturate(180%)');
        expect(result.current.styles.WebkitBackdropFilter).toBe('blur(20px) saturate(180%)');
        expect(result.current.styles.backgroundColor).toBe('rgba(255, 255, 255, 0.25)');
      });

      it('returns regular blur styles for dark scheme', () => {
        const { result } = renderHook(() =>
          useGlassEffect({ effect: 'regular', colorScheme: 'dark' })
        );

        expect(result.current.styles.backdropFilter).toBe('blur(20px) saturate(180%)');
        expect(result.current.styles.backgroundColor).toBe('rgba(0, 0, 0, 0.35)');
      });
    });

    describe('clear effect', () => {
      it('returns clear blur styles for light scheme', () => {
        const { result } = renderHook(() =>
          useGlassEffect({ effect: 'clear', colorScheme: 'light' })
        );

        expect(result.current.styles.backdropFilter).toBe('blur(12px) saturate(120%)');
        expect(result.current.styles.backgroundColor).toBe('rgba(255, 255, 255, 0.1)');
      });

      it('returns clear blur styles for dark scheme', () => {
        const { result } = renderHook(() =>
          useGlassEffect({ effect: 'clear', colorScheme: 'dark' })
        );

        expect(result.current.styles.backdropFilter).toBe('blur(12px) saturate(120%)');
        expect(result.current.styles.backgroundColor).toBe('rgba(0, 0, 0, 0.2)');
      });
    });

    describe('none effect', () => {
      it('returns no blur styles', () => {
        const { result } = renderHook(() =>
          useGlassEffect({ effect: 'none', colorScheme: 'light' })
        );

        expect(result.current.styles.backdropFilter).toBe('none');
        expect(result.current.styles.backgroundColor).toBe('transparent');
      });
    });
  });

  describe('default effect', () => {
    it('defaults to regular effect when not specified', () => {
      const { result } = renderHook(() =>
        useGlassEffect({ colorScheme: 'light' })
      );

      expect(result.current.styles.backdropFilter).toBe('blur(20px) saturate(180%)');
    });
  });

  describe('tint color', () => {
    it('applies tint color to background', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          tintColor: '#ff6b6b',
        })
      );

      // Tint should modify the background color
      expect(result.current.styles.backgroundColor).toMatch(/rgba\(255, 107, 107/);
    });

    it('does not apply tint when effect is none', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'none',
          colorScheme: 'light',
          tintColor: '#ff6b6b',
        })
      );

      expect(result.current.styles.backgroundColor).toBe('transparent');
    });
  });

  describe('interactive styles', () => {
    it('does not apply transform when not interactive', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: false,
        })
      );

      expect(result.current.styles.transform).toBeUndefined();
    });

    it('applies hover transform when interactive and hovered', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: true, isPressed: false },
        })
      );

      expect(result.current.styles.transform).toBe('scale(1.02)');
    });

    it('applies pressed transform when interactive and pressed', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: true, isPressed: true },
        })
      );

      expect(result.current.styles.transform).toBe('scale(0.97)');
    });

    it('pressed takes precedence over hovered', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: true, isPressed: true },
        })
      );

      expect(result.current.styles.transform).toBe('scale(0.97)');
    });

    it('applies box shadow when interactive with regular effect', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: false, isPressed: false },
        })
      );

      expect(result.current.styles.boxShadow).toBeDefined();
      expect(result.current.styles.boxShadow).toContain('rgba');
    });

    it('applies enhanced box shadow when hovered', () => {
      const notHovered = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: false, isPressed: false },
        })
      );

      const hovered = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: true, isPressed: false },
        })
      );

      // Hovered shadow should be different (larger)
      expect(notHovered.result.current.styles.boxShadow).not.toBe(
        hovered.result.current.styles.boxShadow
      );
    });

    it('does not apply box shadow when effect is none', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'none',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: true, isPressed: false },
        })
      );

      expect(result.current.styles.boxShadow).toBeUndefined();
    });
  });

  describe('transitions', () => {
    it('applies interactive transitions when interactive', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
        })
      );

      expect(result.current.styles.transition).toContain('transform');
      expect(result.current.styles.transition).toContain('box-shadow');
    });

    it('applies simpler transitions when not interactive', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: false,
        })
      );

      expect(result.current.styles.transition).toContain('backdrop-filter');
      expect(result.current.styles.transition).not.toContain('transform');
    });
  });

  describe('will-change optimization', () => {
    it('sets will-change when interactive', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
        })
      );

      expect(result.current.styles.willChange).toBe('transform, box-shadow');
    });

    it('does not set will-change when not interactive', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: false,
        })
      );

      expect(result.current.styles.willChange).toBeUndefined();
    });
  });

  describe('color scheme box shadows', () => {
    it('applies darker shadows for dark scheme', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'dark',
          interactive: true,
          interactiveState: { isHovered: false, isPressed: false },
        })
      );

      expect(result.current.styles.boxShadow).toContain('0, 0, 0'); // black shadow
    });

    it('applies lighter shadows for light scheme', () => {
      const { result } = renderHook(() =>
        useGlassEffect({
          effect: 'regular',
          colorScheme: 'light',
          interactive: true,
          interactiveState: { isHovered: false, isPressed: false },
        })
      );

      expect(result.current.styles.boxShadow).toContain('0, 0, 0'); // still black but lower opacity
    });
  });
});
