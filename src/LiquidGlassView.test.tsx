import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiquidGlassView } from './LiquidGlassView';

describe('LiquidGlassView', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<LiquidGlassView>Hello World</LiquidGlassView>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<LiquidGlassView className="custom-class">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
      render(
        <LiquidGlassView style={{ width: '200px', height: '100px' }}>
          Content
        </LiquidGlassView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveStyle({ width: '200px', height: '100px' });
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<LiquidGlassView ref={ref}>Content</LiquidGlassView>);
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it('renders with base liquid-glass-view class', () => {
      render(<LiquidGlassView>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveClass('liquid-glass-view');
    });
  });

  describe('effect prop', () => {
    it('applies regular effect styles by default', () => {
      render(<LiquidGlassView>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveStyle({
        backdropFilter: 'blur(20px) saturate(180%)',
      });
    });

    it('applies regular effect styles when effect="regular"', () => {
      render(<LiquidGlassView effect="regular">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveStyle({
        backdropFilter: 'blur(20px) saturate(180%)',
      });
    });

    it('applies clear effect styles when effect="clear"', () => {
      render(<LiquidGlassView effect="clear">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveStyle({
        backdropFilter: 'blur(12px) saturate(120%)',
      });
    });

    it('applies no effect styles when effect="none"', () => {
      render(<LiquidGlassView effect="none">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveStyle({
        backdropFilter: 'none',
        backgroundColor: 'transparent',
      });
    });
  });

  describe('colorScheme prop', () => {
    it('applies light scheme styles', () => {
      render(<LiquidGlassView colorScheme="light">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveClass('liquid-glass-view--light');
    });

    it('applies dark scheme styles', () => {
      render(<LiquidGlassView colorScheme="dark">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveClass('liquid-glass-view--dark');
    });
  });

  describe('interactive prop', () => {
    it('adds interactive class when interactive=true', () => {
      render(<LiquidGlassView interactive>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveClass('liquid-glass-view--interactive');
    });

    it('does not add interactive class when interactive=false', () => {
      render(<LiquidGlassView interactive={false}>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).not.toHaveClass('liquid-glass-view--interactive');
    });

    it('applies hover transform on mouse enter when interactive', () => {
      render(<LiquidGlassView interactive>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      expect(element).toHaveStyle({ transform: 'scale(1.02)' });
    });

    it('removes hover transform on mouse leave when interactive', () => {
      render(<LiquidGlassView interactive>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      fireEvent.mouseLeave(element);
      expect(element).not.toHaveStyle({ transform: 'scale(1.02)' });
    });

    it('applies pressed transform on mouse down when interactive', () => {
      render(<LiquidGlassView interactive>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      fireEvent.mouseDown(element);
      expect(element).toHaveStyle({ transform: 'scale(0.97)' });
    });

    it('removes pressed transform on mouse up when interactive', () => {
      render(<LiquidGlassView interactive>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      fireEvent.mouseDown(element);
      fireEvent.mouseUp(element);
      expect(element).toHaveStyle({ transform: 'scale(1.02)' });
    });

    it('does not apply transforms when not interactive', () => {
      render(<LiquidGlassView>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      expect(element).not.toHaveStyle({ transform: 'scale(1.02)' });
    });
  });

  describe('tintColor prop', () => {
    it('applies tint color to background', () => {
      render(<LiquidGlassView tintColor="#ff6b6b">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      // Tint is applied at reduced opacity, so we check it contains rgba
      expect(element).toHaveStyle({
        backgroundColor: expect.stringContaining('rgba'),
      });
    });

    it('does not apply tint when effect is none', () => {
      render(<LiquidGlassView effect="none" tintColor="#ff6b6b">Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveStyle({
        backgroundColor: 'transparent',
      });
    });
  });

  describe('event handlers', () => {
    it('calls onMouseEnter handler', () => {
      const handleMouseEnter = vi.fn();
      render(<LiquidGlassView onMouseEnter={handleMouseEnter}>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('calls onMouseLeave handler', () => {
      const handleMouseLeave = vi.fn();
      render(<LiquidGlassView onMouseLeave={handleMouseLeave}>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseLeave(element);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('calls onClick handler', () => {
      const handleClick = vi.fn();
      render(<LiquidGlassView onClick={handleClick}>Content</LiquidGlassView>);
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls custom event handlers alongside interactive handlers', () => {
      const handleMouseEnter = vi.fn();
      render(
        <LiquidGlassView interactive onMouseEnter={handleMouseEnter}>
          Content
        </LiquidGlassView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-view')!;
      
      fireEvent.mouseEnter(element);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(element).toHaveStyle({ transform: 'scale(1.02)' });
    });
  });

  describe('HTML attributes', () => {
    it('passes through aria attributes', () => {
      render(
        <LiquidGlassView aria-label="Glass panel" role="region">
          Content
        </LiquidGlassView>
      );
      const element = screen.getByText('Content').closest('.liquid-glass-view');
      expect(element).toHaveAttribute('aria-label', 'Glass panel');
      expect(element).toHaveAttribute('role', 'region');
    });

    it('passes through data attributes', () => {
      render(
        <LiquidGlassView data-testid="glass-view" data-custom="value">
          Content
        </LiquidGlassView>
      );
      const element = screen.getByTestId('glass-view');
      expect(element).toHaveAttribute('data-custom', 'value');
    });
  });
});
