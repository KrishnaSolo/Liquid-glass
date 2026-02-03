import { useMemo } from 'react';
import type { GlassEffect, GlassEffectStyles, InteractiveState } from '../types';
import { applyTintToBackground } from '../utils/color';

/**
 * Glass effect configuration for different modes and schemes
 * 
 * These values are tuned to match iOS's liquid glass appearance:
 * - Regular: Standard frosted glass with good opacity
 * - Clear: More transparent, subtle blur
 * - None: Completely transparent for animation transitions
 */
const GLASS_EFFECTS: Record<
  GlassEffect,
  Record<'light' | 'dark', GlassEffectStyles>
> = {
  regular: {
    light: {
      // Stronger blur and saturation for rich glass effect
      backdropFilter: 'blur(24px) saturate(180%) brightness(1.05)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.05)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    dark: {
      backdropFilter: 'blur(24px) saturate(180%) brightness(0.95)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(0.95)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  clear: {
    light: {
      // Lighter blur, more transparent
      backdropFilter: 'blur(16px) saturate(140%)',
      WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    dark: {
      backdropFilter: 'blur(16px) saturate(140%)',
      WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
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

    // Calculate box shadow for interactive state - enhanced with multiple layers
    let boxShadow: string | undefined;
    if (interactive && effect !== 'none') {
      if (interactiveState.isPressed) {
        // Pressed state - reduced shadow, pressed down appearance
        boxShadow = colorScheme === 'dark'
          ? '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)';
      } else if (interactiveState.isHovered) {
        // Hover state - elevated appearance with soft glow
        boxShadow = colorScheme === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(255, 255, 255, 0.5)';
      } else {
        // Default state - subtle depth
        boxShadow = colorScheme === 'dark'
          ? '0 4px 16px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)'
          : '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)';
      }
    } else if (effect !== 'none') {
      // Non-interactive but still has glass effect - add subtle shadow for depth
      boxShadow = colorScheme === 'dark'
        ? '0 2px 8px rgba(0, 0, 0, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.06)';
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
