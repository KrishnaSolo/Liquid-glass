import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { LiquidGlassContainerView, LiquidGlassView } from '../src';

describe('LiquidGlassView', () => {
  it('sets default data attributes', () => {
    render(<LiquidGlassView data-testid="glass" />);

    const element = screen.getByTestId('glass');
    expect(element.dataset.effect).toBe('regular');
    expect(element.dataset.interactive).toBe('false');
    expect(element.dataset.scheme).toBe('system');
  });

  it('applies tint and container spacing variables', () => {
    render(
      <LiquidGlassContainerView spacing={16}>
        <LiquidGlassView data-testid="glass" tintColor="rgba(0, 120, 255, 0.4)" />
      </LiquidGlassContainerView>
    );

    const element = screen.getByTestId('glass');
    expect(element.style.getPropertyValue('--lg-tint-color')).toBe(
      'rgba(0, 120, 255, 0.4)'
    );
    expect(element.style.getPropertyValue('--lg-merge-spacing')).toBe('16px');
  });

  it('accepts effect overrides', () => {
    render(<LiquidGlassView data-testid="glass" effect="none" />);

    const element = screen.getByTestId('glass');
    expect(element.dataset.effect).toBe('none');
  });
});
