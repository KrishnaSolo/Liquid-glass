import React from 'react';

import { LiquidGlassContainerProvider } from '../context/liquidGlassContext';

export interface LiquidGlassContainerViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
}

type CSSVarStyle = React.CSSProperties & {
  ['--lg-merge-spacing']?: string;
};

const joinClassNames = (...values: Array<string | undefined | null | false>) =>
  values.filter(Boolean).join(' ');

export const LiquidGlassContainerView = React.forwardRef<
  HTMLDivElement,
  LiquidGlassContainerViewProps
>(({ spacing = 0, className, style, children, ...rest }, ref) => {
  const mergedStyle: CSSVarStyle = {
    ...(style ?? {}),
    '--lg-merge-spacing': `${spacing}px`
  };

  return (
    <LiquidGlassContainerProvider spacing={spacing}>
      <div
        ref={ref}
        className={joinClassNames('lg-container', className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </div>
    </LiquidGlassContainerProvider>
  );
});

LiquidGlassContainerView.displayName = 'LiquidGlassContainerView';
