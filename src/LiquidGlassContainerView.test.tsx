import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LiquidGlassContainerView, useContainerContext } from './LiquidGlassContainerView';
import { LiquidGlassView } from './LiquidGlassView';

// Helper component to test context
function ContextConsumer() {
  const context = useContainerContext();
  return (
    <div data-testid="context-consumer">
      <span data-testid="is-in-container">{String(context.isInContainer)}</span>
      <span data-testid="spacing">{context.spacing}</span>
    </div>
  );
}

describe('LiquidGlassContainerView', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <LiquidGlassContainerView>
          <span>Child 1</span>
          <span>Child 2</span>
        </LiquidGlassContainerView>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <LiquidGlassContainerView className="custom-container">
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveClass('custom-container');
    });

    it('applies custom style', () => {
      render(
        <LiquidGlassContainerView style={{ display: 'flex', gap: '20px' }}>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveStyle({ display: 'flex', gap: '20px' });
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(
        <LiquidGlassContainerView ref={ref}>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with base liquid-glass-container class', () => {
      render(
        <LiquidGlassContainerView>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveClass('liquid-glass-container');
    });
  });

  describe('spacing prop', () => {
    it('sets CSS custom property for spacing', () => {
      render(
        <LiquidGlassContainerView spacing={20}>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveStyle({
        '--liquid-glass-container-spacing': '20px',
      });
    });

    it('defaults spacing to 0', () => {
      render(
        <LiquidGlassContainerView>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveStyle({
        '--liquid-glass-container-spacing': '0px',
      });
    });

    it('applies different spacing values', () => {
      const { rerender } = render(
        <LiquidGlassContainerView spacing={10}>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      
      let element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveStyle({
        '--liquid-glass-container-spacing': '10px',
      });

      rerender(
        <LiquidGlassContainerView spacing={50}>
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      
      element = screen.getByText('Content').closest('.liquid-glass-container');
      expect(element).toHaveStyle({
        '--liquid-glass-container-spacing': '50px',
      });
    });
  });

  describe('context', () => {
    it('provides isInContainer=true to children', () => {
      render(
        <LiquidGlassContainerView>
          <ContextConsumer />
        </LiquidGlassContainerView>
      );
      expect(screen.getByTestId('is-in-container')).toHaveTextContent('true');
    });

    it('provides spacing value to children', () => {
      render(
        <LiquidGlassContainerView spacing={25}>
          <ContextConsumer />
        </LiquidGlassContainerView>
      );
      expect(screen.getByTestId('spacing')).toHaveTextContent('25');
    });

    it('provides default context values outside container', () => {
      render(<ContextConsumer />);
      expect(screen.getByTestId('is-in-container')).toHaveTextContent('false');
      expect(screen.getByTestId('spacing')).toHaveTextContent('0');
    });
  });

  describe('child data attributes', () => {
    it('adds data-in-container attribute to children', () => {
      render(
        <LiquidGlassContainerView>
          <div data-testid="child">Child</div>
        </LiquidGlassContainerView>
      );
      const child = screen.getByTestId('child');
      expect(child).toHaveAttribute('data-in-container', 'true');
    });

    it('adds data-container-spacing attribute to children', () => {
      render(
        <LiquidGlassContainerView spacing={30}>
          <div data-testid="child">Child</div>
        </LiquidGlassContainerView>
      );
      const child = screen.getByTestId('child');
      expect(child).toHaveAttribute('data-container-spacing', '30');
    });
  });

  describe('with LiquidGlassView children', () => {
    it('renders LiquidGlassView children correctly', () => {
      render(
        <LiquidGlassContainerView spacing={20}>
          <LiquidGlassView>Glass 1</LiquidGlassView>
          <LiquidGlassView>Glass 2</LiquidGlassView>
        </LiquidGlassContainerView>
      );
      expect(screen.getByText('Glass 1')).toBeInTheDocument();
      expect(screen.getByText('Glass 2')).toBeInTheDocument();
    });

    it('applies data attributes to LiquidGlassView children', () => {
      render(
        <LiquidGlassContainerView spacing={15}>
          <LiquidGlassView data-testid="glass-child">Glass</LiquidGlassView>
        </LiquidGlassContainerView>
      );
      const glassChild = screen.getByTestId('glass-child');
      expect(glassChild).toHaveAttribute('data-in-container', 'true');
      expect(glassChild).toHaveAttribute('data-container-spacing', '15');
    });
  });

  describe('HTML attributes', () => {
    it('passes through aria attributes', () => {
      render(
        <LiquidGlassContainerView aria-label="Glass container" role="group">
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByRole('group');
      expect(element).toHaveAttribute('aria-label', 'Glass container');
    });

    it('passes through data attributes', () => {
      render(
        <LiquidGlassContainerView data-testid="container" data-custom="value">
          <span>Content</span>
        </LiquidGlassContainerView>
      );
      const element = screen.getByTestId('container');
      expect(element).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('non-element children', () => {
    it('handles text nodes', () => {
      render(
        <LiquidGlassContainerView>
          Plain text
        </LiquidGlassContainerView>
      );
      expect(screen.getByText('Plain text')).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(
        <LiquidGlassContainerView>
          {null}
          <span>Valid child</span>
        </LiquidGlassContainerView>
      );
      expect(screen.getByText('Valid child')).toBeInTheDocument();
    });

    it('handles boolean children', () => {
      render(
        <LiquidGlassContainerView>
          {true && <span>Conditional</span>}
          {false && <span>Hidden</span>}
        </LiquidGlassContainerView>
      );
      expect(screen.getByText('Conditional')).toBeInTheDocument();
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
  });
});
