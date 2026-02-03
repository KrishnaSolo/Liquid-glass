import {
  forwardRef,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
  createContext,
  useContext,
} from 'react';
import type { LiquidGlassContainerViewProps } from './types';
import './styles/glass.css';

/**
 * Context to communicate container state to child LiquidGlassView components
 */
interface ContainerContextValue {
  isInContainer: boolean;
  spacing: number;
}

const ContainerContext = createContext<ContainerContextValue>({
  isInContainer: false,
  spacing: 0,
});

/**
 * Hook to access container context from child components
 */
export function useContainerContext(): ContainerContextValue {
  return useContext(ContainerContext);
}

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
export const LiquidGlassContainerView = forwardRef<
  HTMLDivElement,
  LiquidGlassContainerViewProps
>(function LiquidGlassContainerView(props, ref) {
  const { children, className, style, spacing = 0, ...rest } = props;

  // Context value for children
  const contextValue = useMemo<ContainerContextValue>(
    () => ({
      isInContainer: true,
      spacing,
    }),
    [spacing]
  );

  // Combine class names
  const combinedClassName = useMemo(() => {
    const classes = ['liquid-glass-container'];

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [className]);

  // Process children to add container-aware props
  const processedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      // Pass container context via data attribute for CSS-based merging
      return cloneElement(child, {
        ...child.props,
        'data-in-container': 'true',
        'data-container-spacing': spacing,
      } as React.HTMLAttributes<HTMLElement>);
    });
  }, [children, spacing]);

  // Container styles with CSS custom property for spacing
  const combinedStyle = useMemo<React.CSSProperties>(
    () => ({
      ...style,
      '--liquid-glass-container-spacing': `${spacing}px`,
    } as React.CSSProperties),
    [style, spacing]
  );

  return (
    <ContainerContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={combinedClassName}
        style={combinedStyle}
        {...rest}
      >
        {processedChildren}
      </div>
    </ContainerContext.Provider>
  );
});

LiquidGlassContainerView.displayName = 'LiquidGlassContainerView';
