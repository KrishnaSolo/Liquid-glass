import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useColorScheme } from './useColorScheme';

describe('useColorScheme', () => {
  let matchMediaMock: vi.Mock;
  let listeners: Map<string, (e: MediaQueryListEvent) => void>;

  beforeEach(() => {
    listeners = new Map();
    matchMediaMock = vi.fn((query: string) => ({
      matches: query.includes('dark') ? false : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          listeners.set(query, listener);
        }
      }),
      removeEventListener: vi.fn((event: string) => {
        if (event === 'change') {
          listeners.delete(query);
        }
      }),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('static color schemes', () => {
    it('returns "light" when colorScheme is "light"', () => {
      const { result } = renderHook(() => useColorScheme('light'));
      expect(result.current).toBe('light');
    });

    it('returns "dark" when colorScheme is "dark"', () => {
      const { result } = renderHook(() => useColorScheme('dark'));
      expect(result.current).toBe('dark');
    });

    it('does not add event listener for static schemes', () => {
      renderHook(() => useColorScheme('light'));
      expect(listeners.size).toBe(0);
    });
  });

  describe('system color scheme', () => {
    it('returns system preference (light) when colorScheme is "system"', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false, // prefers-color-scheme: dark is false = light mode
        media: query,
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.set(query, listener);
        }),
        removeEventListener: vi.fn(),
      }));

      const { result } = renderHook(() => useColorScheme('system'));
      expect(result.current).toBe('light');
    });

    it('returns system preference (dark) when system is dark', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('dark'), // prefers-color-scheme: dark matches
        media: query,
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.set(query, listener);
        }),
        removeEventListener: vi.fn(),
      }));

      const { result } = renderHook(() => useColorScheme('system'));
      expect(result.current).toBe('dark');
    });

    it('defaults to "system" when no argument provided', () => {
      const { result } = renderHook(() => useColorScheme());
      expect(result.current).toBe('light'); // default mock returns false for dark
    });

    it('adds event listener for system changes', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.set(query, listener);
        }),
        removeEventListener: vi.fn(),
      }));

      renderHook(() => useColorScheme('system'));
      expect(listeners.size).toBe(1);
    });

    it('updates when system preference changes', () => {
      let matches = false;
      matchMediaMock.mockImplementation((query: string) => ({
        matches,
        media: query,
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.set(query, listener);
        }),
        removeEventListener: vi.fn(),
      }));

      const { result } = renderHook(() => useColorScheme('system'));
      expect(result.current).toBe('light');

      // Simulate system change to dark
      act(() => {
        const listener = listeners.get('(prefers-color-scheme: dark)');
        if (listener) {
          listener({ matches: true } as MediaQueryListEvent);
        }
      });

      expect(result.current).toBe('dark');
    });
  });

  describe('switching color schemes', () => {
    it('updates when prop changes from light to dark', () => {
      const { result, rerender } = renderHook(
        ({ scheme }) => useColorScheme(scheme),
        { initialProps: { scheme: 'light' as const } }
      );

      expect(result.current).toBe('light');

      rerender({ scheme: 'dark' as const });
      expect(result.current).toBe('dark');
    });

    it('updates when prop changes from static to system', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('dark'),
        media: query,
        addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.set(query, listener);
        }),
        removeEventListener: vi.fn(),
      }));

      const { result, rerender } = renderHook(
        ({ scheme }) => useColorScheme(scheme),
        { initialProps: { scheme: 'light' as const } }
      );

      expect(result.current).toBe('light');

      rerender({ scheme: 'system' as const });
      expect(result.current).toBe('dark');
    });
  });

  describe('cleanup', () => {
    it('removes event listener on unmount', () => {
      const removeEventListener = vi.fn();
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener,
      }));

      const { unmount } = renderHook(() => useColorScheme('system'));
      unmount();

      expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });
});
