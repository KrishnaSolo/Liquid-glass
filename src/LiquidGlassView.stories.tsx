import type { Meta, StoryObj } from '@storybook/react';
import { LiquidGlassView } from './LiquidGlassView';
import { isLiquidGlassSupported } from './isLiquidGlassSupported';

const meta: Meta<typeof LiquidGlassView> = {
  title: 'Components/LiquidGlassView',
  component: LiquidGlassView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A view component that applies the liquid glass visual effect using CSS backdrop-filter.

The liquid glass effect creates a translucent, blurred background that adapts to the content behind it,
similar to iOS 26's glass effect.

**Browser Support:** ${isLiquidGlassSupported ? '✅ Supported' : '❌ Not supported'} in this browser.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    effect: {
      control: 'select',
      options: ['regular', 'clear', 'none'],
      description: 'Visual effect mode',
    },
    colorScheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Color scheme adaptation',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover/active interaction effects',
    },
    tintColor: {
      control: 'color',
      description: 'Overlay color tint',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidGlassView>;

// Base styles for demos
const baseStyle: React.CSSProperties = {
  padding: '24px 32px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '200px',
};

/**
 * The default Regular effect provides a standard glass blur with moderate opacity.
 */
export const Regular: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'system',
    interactive: false,
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Regular Glass</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Standard blur effect</p>
      </div>
    ),
    style: baseStyle,
  },
};

/**
 * The Clear effect provides a more transparent glass with lighter blur.
 */
export const Clear: Story = {
  args: {
    effect: 'clear',
    colorScheme: 'system',
    interactive: false,
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Clear Glass</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>More transparent effect</p>
      </div>
    ),
    style: baseStyle,
  },
};

/**
 * The None effect removes all glass effects, useful for animated transitions.
 */
export const None: Story = {
  args: {
    effect: 'none',
    colorScheme: 'system',
    interactive: false,
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>No Effect</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Transparent view</p>
      </div>
    ),
    style: { ...baseStyle, border: '2px dashed rgba(255,255,255,0.3)' },
  },
};

/**
 * Interactive mode enables hover effects with scale transform and shimmer animation.
 */
export const Interactive: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'system',
    interactive: true,
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Interactive</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Hover to see effects</p>
      </div>
    ),
    style: baseStyle,
  },
};

/**
 * Dark color scheme forces dark appearance regardless of system preference.
 */
export const DarkScheme: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'dark',
    interactive: false,
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Dark Scheme</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Forced dark appearance</p>
      </div>
    ),
    style: baseStyle,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

/**
 * Light color scheme forces light appearance regardless of system preference.
 */
export const LightScheme: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'light',
    interactive: false,
    children: (
      <div style={{ textAlign: 'center', color: '#333' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Light Scheme</h3>
        <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>Forced light appearance</p>
      </div>
    ),
    style: baseStyle,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Apply a color tint to the glass for branded or themed effects.
 */
export const WithTintColor: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'system',
    interactive: false,
    tintColor: '#ff6b6b',
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Tinted Glass</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Red tint overlay</p>
      </div>
    ),
    style: baseStyle,
  },
};

/**
 * Orange tint for warm-themed interfaces.
 */
export const OrangeTint: Story = {
  args: {
    effect: 'clear',
    colorScheme: 'system',
    interactive: true,
    tintColor: 'orange',
    children: (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Orange Glass</h3>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Warm tint effect</p>
      </div>
    ),
    style: baseStyle,
  },
};

/**
 * Example of a weather widget-style card.
 */
export const WeatherWidget: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'dark',
    interactive: true,
    children: (
      <div style={{ textAlign: 'left', color: 'white', minWidth: '180px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '16px', opacity: 0.9 }}>San Francisco</p>
        <p style={{ margin: '0 0 8px 0', fontSize: '48px', fontWeight: 200 }}>72°</p>
        <p style={{ margin: 0, fontSize: '28px' }}>☀️</p>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.7 }}>Sunny</p>
      </div>
    ),
    style: {
      ...baseStyle,
      padding: '20px',
      minWidth: '170px',
    },
  },
};

/**
 * A button-style glass component.
 */
export const Button: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'dark',
    interactive: true,
    children: (
      <span style={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>Click Me</span>
    ),
    style: {
      padding: '16px 32px',
      borderRadius: '16px',
      cursor: 'pointer',
    },
  },
};

/**
 * A toolbar with glass effect.
 */
export const Toolbar: Story = {
  args: {
    effect: 'regular',
    colorScheme: 'system',
    interactive: false,
    children: (
      <div style={{ display: 'flex', gap: '16px', color: 'white' }}>
        <span style={{ padding: '8px', cursor: 'pointer' }}>File</span>
        <span style={{ padding: '8px', cursor: 'pointer' }}>Edit</span>
        <span style={{ padding: '8px', cursor: 'pointer' }}>View</span>
        <span style={{ padding: '8px', cursor: 'pointer' }}>Help</span>
      </div>
    ),
    style: {
      padding: '8px 16px',
      borderRadius: '30px',
    },
  },
};

/**
 * Circular glass effect often used for icons or avatars.
 */
export const Circle: Story = {
  args: {
    effect: 'clear',
    colorScheme: 'system',
    interactive: true,
    children: (
      <span style={{ fontSize: '32px', color: 'white' }}>👋</span>
    ),
    style: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

/**
 * Comparison of all three effect modes side by side.
 */
export const AllEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <LiquidGlassView effect="regular" style={baseStyle}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h4 style={{ margin: '0 0 4px 0' }}>Regular</h4>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Standard blur</p>
        </div>
      </LiquidGlassView>
      <LiquidGlassView effect="clear" style={baseStyle}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h4 style={{ margin: '0 0 4px 0' }}>Clear</h4>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Light blur</p>
        </div>
      </LiquidGlassView>
      <LiquidGlassView effect="none" style={{ ...baseStyle, border: '2px dashed rgba(255,255,255,0.3)' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h4 style={{ margin: '0 0 4px 0' }}>None</h4>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>No effect</p>
        </div>
      </LiquidGlassView>
    </div>
  ),
};

/**
 * Comparison of color schemes side by side.
 */
export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <LiquidGlassView effect="regular" colorScheme="light" style={baseStyle}>
        <div style={{ textAlign: 'center', color: '#333' }}>
          <h4 style={{ margin: '0 0 4px 0' }}>Light</h4>
        </div>
      </LiquidGlassView>
      <LiquidGlassView effect="regular" colorScheme="dark" style={baseStyle}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h4 style={{ margin: '0 0 4px 0' }}>Dark</h4>
        </div>
      </LiquidGlassView>
      <LiquidGlassView effect="regular" colorScheme="system" style={baseStyle}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h4 style={{ margin: '0 0 4px 0' }}>System</h4>
        </div>
      </LiquidGlassView>
    </div>
  ),
};

/**
 * Various tint color examples.
 */
export const TintColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#f39c12', '#9b59b6'].map((color) => (
        <LiquidGlassView
          key={color}
          effect="regular"
          tintColor={color}
          interactive
          style={{ ...baseStyle, minWidth: '100px' }}
        >
          <div style={{ textAlign: 'center', color: 'white', fontSize: '12px' }}>
            {color}
          </div>
        </LiquidGlassView>
      ))}
    </div>
  ),
};
