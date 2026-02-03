import * as react from 'react';
import { HTMLAttributes, ReactNode } from 'react';

/**
 * Effect mode for the liquid glass view
 */
type GlassEffect = 'clear' | 'regular' | 'none';
/**
 * Color scheme options
 */
type ColorScheme = 'light' | 'dark' | 'system';
/**
 * Props for the LiquidGlassView component
 */
interface LiquidGlassViewProps extends HTMLAttributes<HTMLDivElement> {
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
interface LiquidGlassContainerViewProps extends HTMLAttributes<HTMLDivElement> {
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
 * Interactive state for glass components
 */
interface InteractiveState {
    isHovered: boolean;
    isPressed: boolean;
}

/**
 * A view component that applies the liquid glass visual effect.
 *
 * The liquid glass effect creates a translucent, blurred background
 * that adapts to the content behind it, similar to iOS 26's glass effect.
 *
 * @example
 * ```tsx
 * <LiquidGlassView
 *   style={{ width: 200, height: 100, borderRadius: 20 }}
 *   effect="regular"
 *   interactive
 * >
 *   <span>Hello World</span>
 * </LiquidGlassView>
 * ```
 */
declare const LiquidGlassView: react.ForwardRefExoticComponent<LiquidGlassViewProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Context to communicate container state to child LiquidGlassView components
 */
interface ContainerContextValue {
    isInContainer: boolean;
    spacing: number;
}
/**
 * Hook to access container context from child components
 */
declare function useContainerContext(): ContainerContextValue;
/**
 * A container view that renders multiple glass elements into a combined effect.
 *
 * When LiquidGlassView children are placed within this container and are
 * within the specified spacing distance, their glass effects visually merge
 * to create a unified glass surface.
 *
 * @example
 * ```tsx
 * <LiquidGlassContainerView spacing={20} style={{ display: 'flex', gap: 10 }}>
 *   <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
 *   <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
 * </LiquidGlassContainerView>
 * ```
 */
declare const LiquidGlassContainerView: react.ForwardRefExoticComponent<LiquidGlassContainerViewProps & react.RefAttributes<HTMLDivElement>>;

/**
 * Boolean constant indicating whether the current browser supports
 * the liquid glass effect (CSS backdrop-filter).
 *
 * Use this to conditionally render fallback UI on unsupported browsers.
 *
 * @example
 * ```tsx
 * import { isLiquidGlassSupported, LiquidGlassView } from '@liquid-glass/react';
 *
 * function MyComponent() {
 *   return (
 *     <LiquidGlassView
 *       style={!isLiquidGlassSupported ? { backgroundColor: 'rgba(255,255,255,0.5)' } : undefined}
 *     >
 *       Content
 *     </LiquidGlassView>
 *   );
 * }
 * ```
 */
declare const isLiquidGlassSupported: boolean;

/**
 * Hook that resolves the effective color scheme based on the provided value
 * and system preferences.
 *
 * @param colorScheme - The color scheme preference ('light', 'dark', or 'system')
 * @returns The resolved color scheme ('light' or 'dark')
 */
declare function useColorScheme(colorScheme?: ColorScheme): 'light' | 'dark';

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
declare function useGlassEffect(options: UseGlassEffectOptions): UseGlassEffectReturn;

interface UseInteractiveOptions {
    enabled?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
}
interface UseInteractiveReturn {
    state: InteractiveState;
    handlers: {
        onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
        onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
        onMouseDown: React.MouseEventHandler<HTMLDivElement>;
        onMouseUp: React.MouseEventHandler<HTMLDivElement>;
    };
}
/**
 * Hook that manages interactive state (hover/press) for glass components
 *
 * @param options - Configuration options
 * @returns Interactive state and event handlers
 */
declare function useInteractive(options?: UseInteractiveOptions): UseInteractiveReturn;

export { type ColorScheme, type GlassEffect, LiquidGlassContainerView, type LiquidGlassContainerViewProps, LiquidGlassView, type LiquidGlassViewProps, isLiquidGlassSupported, useColorScheme, useContainerContext, useGlassEffect, useInteractive };
