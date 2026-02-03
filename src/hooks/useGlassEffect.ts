import { useMemo } from 'react';
import type { GlassEffect, GlassEffectStyles, InteractiveState } from '../types';
import { applyTintToBackground } from '../utils/color';

/**
 * Glass effect configuration for different modes and schemes
 */
const GLASS_EFFECTS: Record<
  GlassEffect,
  Record<'light' | 'dark', GlassEffectStyles>
> = {
  regular: {
    light: {
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    dark: {
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
    },
  },
  clear: {
    light: {
      backdropFilter: 'blur(12px) saturate(120%)',
      WebkitBackdropFilter: 'blur(12px) saturate(120%)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dark: {
      backdropFilter: 'blur(12px) saturate(120%)',
      WebkitBackdropFilter: 'blur(12px) saturate(120%)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  none: {
    light: {
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      backgroundColor: 'transparent',
    },
    dark: {
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      backgroundColor: 'transparent',
    },
  },
};

interface UseGlassEffectOptions {
  effect?: GlassEffect;
  colorScheme: 'light' | 'dark';
  tintColor?: string;
  interactive?: boolean;
  interactiveState?: InteractiveState;
}

interface UseGlassEffectReturn {
  styles: React.CSSProperties;
}

/**
 * Hook that computes the CSS styles for the liquid glass effect
 *
 * @param options - Configuration options for the glass effect
 * @returns CSS styles object to apply to the element
 */
export function useGlassEffect(options: UseGlassEffectOptions): UseGlassEffectReturn {
  const {
    effect = 'regular',
    colorScheme,
    tintColor,
    interactive = false,
    interactiveState = { isHovered: false, isPressed: false },
  } = options;

  const styles = useMemo<React.CSSProperties>(() => {
    const baseStyles = GLASS_EFFECTS[effect][colorScheme];

    // Apply tint color if provided
    let backgroundColor = baseStyles.backgroundColor;
    if (tintColor && effect !== 'none') {
      const tintedBg = applyTintToBackground(backgroundColor, tintColor);
      // Blend tint with base background
      backgroundColor = tintedBg;
    }

    // Calculate transform for interactive state
    let transform: string | undefined;
    if (interactive) {
      if (interactiveState.isPressed) {
        transform = 'scale(0.97)';
      } else if (interactiveState.isHovered) {
        transform = 'scale(1.02)';
      }
    }

    // Calculate box shadow for interactive state
    let boxShadow: string | undefined;
    if (interactive && effect !== 'none') {
      if (interactiveState.isHovered) {
        boxShadow = colorScheme === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.3)';
      } else {
        boxShadow = colorScheme === 'dark'
          ? '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
          : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)';
      }
    }

    return {
      backdropFilter: baseStyles.backdropFilter,
      WebkitBackdropFilter: baseStyles.WebkitBackdropFilter,
      backgroundColor,
      transform,
      boxShadow,
      // Smooth transitions for interactive effects
      transition: interactive
        ? 'transform 0.2s ease-out, box-shadow 0.2s ease-out, backdrop-filter 0.3s ease-out, background-color 0.3s ease-out'
        : 'backdrop-filter 0.3s ease-out, background-color 0.3s ease-out',
      // Hint browser for optimization
      willChange: interactive ? 'transform, box-shadow' : undefined,
    };
  }, [effect, colorScheme, tintColor, interactive, interactiveState]);

  return { styles };
}
