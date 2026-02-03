/**
 * @liquid-glass/react
 *
 * Liquid Glass effect components for React web.
 * A port of the callstack/liquid-glass React Native library.
 *
 * @packageDocumentation
 */

// Main components
export { LiquidGlassView } from './LiquidGlassView';
export { LiquidGlassContainerView, useContainerContext } from './LiquidGlassContainerView';

// Utilities
export { isLiquidGlassSupported } from './isLiquidGlassSupported';

// Types
export type {
  LiquidGlassViewProps,
  LiquidGlassContainerViewProps,
  GlassEffect,
  ColorScheme,
} from './types';

// Hooks (for advanced usage)
export { useColorScheme } from './hooks/useColorScheme';
export { useGlassEffect } from './hooks/useGlassEffect';
export { useInteractive } from './hooks/useInteractive';
