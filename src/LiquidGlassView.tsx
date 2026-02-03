import { forwardRef, useMemo } from 'react';
import type { LiquidGlassViewProps } from './types';
import { useColorScheme } from './hooks/useColorScheme';
import { useInteractive } from './hooks/useInteractive';
import { useGlassEffect } from './hooks/useGlassEffect';
import './styles/glass.css';

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
export const LiquidGlassView = forwardRef<HTMLDivElement, LiquidGlassViewProps>(
  function LiquidGlassView(props, ref) {
    const {
      children,
      className,
      style,
      interactive = false,
      effect = 'regular',
      tintColor,
      colorScheme = 'system',
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    } = props;

    // Resolve the effective color scheme
    const resolvedColorScheme = useColorScheme(colorScheme);

    // Handle interactive state
    const { state: interactiveState, handlers } = useInteractive({
      enabled: interactive,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
    });

    // Compute glass effect styles
    const { styles: glassStyles } = useGlassEffect({
      effect,
      colorScheme: resolvedColorScheme,
      tintColor,
      interactive,
      interactiveState,
    });

    // Combine class names
    const combinedClassName = useMemo(() => {
      const classes = ['liquid-glass-view'];

      classes.push(`liquid-glass-view--${resolvedColorScheme}`);

      if (interactive) {
        classes.push('liquid-glass-view--interactive');
      }

      if (className) {
        classes.push(className);
      }

      return classes.join(' ');
    }, [resolvedColorScheme, interactive, className]);

    // Combine styles
    const combinedStyle = useMemo<React.CSSProperties>(() => {
      return {
        ...glassStyles,
        ...style,
      };
    }, [glassStyles, style]);

    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={combinedStyle}
        {...handlers}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

LiquidGlassView.displayName = 'LiquidGlassView';
