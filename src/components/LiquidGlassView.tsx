import React from 'react';

import { useLiquidGlassContainer } from '../context/liquidGlassContext';

export type LiquidGlassEffect = 'clear' | 'regular' | 'none';
export type LiquidGlassColorScheme = 'light' | 'dark' | 'system';

export interface LiquidGlassViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  effect?: LiquidGlassEffect;
  tintColor?: string;
  colorScheme?: LiquidGlassColorScheme;
}

type CSSVarStyle = React.CSSProperties & {
  ['--lg-tint-color']?: string;
  ['--lg-merge-spacing']?: string;
};

const joinClassNames = (...values: Array<string | undefined | null | false>) =>
  values.filter(Boolean).join(' ');

export const LiquidGlassView = React.forwardRef<
  HTMLDivElement,
  LiquidGlassViewProps
>(
  (
    {
      interactive = false,
      effect = 'regular',
      tintColor,
      colorScheme = 'system',
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const container = useLiquidGlassContainer();
    const mergedStyle: CSSVarStyle = {
      ...(style ?? {})
    };

    if (tintColor) {
      mergedStyle['--lg-tint-color'] = tintColor;
    }

    if (container?.spacing !== undefined) {
      mergedStyle['--lg-merge-spacing'] = `${container.spacing}px`;
    }

    return (
      <div
        ref={ref}
        className={joinClassNames('lg-view', className)}
        data-effect={effect}
        data-interactive={interactive ? 'true' : 'false'}
        data-scheme={colorScheme}
        style={mergedStyle}
        {...rest}
      />
    );
  }
);

LiquidGlassView.displayName = 'LiquidGlassView';
