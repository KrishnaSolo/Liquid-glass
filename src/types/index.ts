import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Effect mode for the liquid glass view
 */
export type GlassEffect = 'clear' | 'regular' | 'none';

/**
 * Color scheme options
 */
export type ColorScheme = 'light' | 'dark' | 'system';

/**
 * Props for the LiquidGlassView component
 */
export interface LiquidGlassViewProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enables hover/active interaction effects
   * When true, the view will grow on hover and show a subtle shimmer effect
   * @default false
   */
  interactive?: boolean;

  /**
   * Visual effect mode
   * - 'regular': Standard glass blur effect (more opaque)
   * - 'clear': More transparent glass effect
   * - 'none': No glass effect (transparent view)
   * @default 'regular'
   */
  effect?: GlassEffect;

  /**
   * Overlay color tint applied to the glass effect
   * Accepts any valid CSS color value (hex, rgba, named colors)
   */
  tintColor?: string;

  /**
   * Color scheme adaptation
   * - 'light': Light appearance
   * - 'dark': Dark appearance
   * - 'system': Follows system preference
   * @default 'system'
   */
  colorScheme?: ColorScheme;

  /**
   * React children
   */
  children?: ReactNode;
}

/**
 * Props for the LiquidGlassContainerView component
 */
export interface LiquidGlassContainerViewProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The distance (in pixels) between child elements at which they begin to merge
   * their glass effects into a combined effect
   * @default 0
   */
  spacing?: number;

  /**
   * React children
   */
  children?: ReactNode;
}

/**
 * Internal glass effect styles configuration
 */
export interface GlassEffectStyles {
  backdropFilter: string;
  WebkitBackdropFilter: string;
  backgroundColor: string;
}

/**
 * Interactive state for glass components
 */
export interface InteractiveState {
  isHovered: boolean;
  isPressed: boolean;
}
