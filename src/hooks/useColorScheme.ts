import { useState, useEffect, useCallback } from 'react';
import type { ColorScheme } from '../types';

/**
 * Hook that resolves the effective color scheme based on the provided value
 * and system preferences.
 *
 * @param colorScheme - The color scheme preference ('light', 'dark', or 'system')
 * @returns The resolved color scheme ('light' or 'dark')
 */
export function useColorScheme(colorScheme: ColorScheme = 'system'): 'light' | 'dark' {
  const getSystemColorScheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const [resolvedScheme, setResolvedScheme] = useState<'light' | 'dark'>(() => {
    if (colorScheme === 'system') {
      return getSystemColorScheme();
    }
    return colorScheme;
  });

  useEffect(() => {
    if (colorScheme !== 'system') {
      setResolvedScheme(colorScheme);
      return;
    }

    // Set initial value
    setResolvedScheme(getSystemColorScheme());

    // Listen for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [colorScheme, getSystemColorScheme]);

  return resolvedScheme;
}
