import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { LiquidGlassContainerView } from '../src';

describe('LiquidGlassContainerView', () => {
  it('sets merge spacing on the container', () => {
    render(<LiquidGlassContainerView data-testid="container" spacing={12} />);

    const element = screen.getByTestId('container');
    expect(element.style.getPropertyValue('--lg-merge-spacing')).toBe('12px');
  });

  it('renders children inside the container', () => {
    render(
      <LiquidGlassContainerView>
        <div data-testid="child" />
      </LiquidGlassContainerView>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
