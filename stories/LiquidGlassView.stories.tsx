import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { LiquidGlassView } from '../src';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: 48,
      minHeight: 240,
      background:
        'radial-gradient(circle at 20% 20%, #f6f6ff, #e2e8f4 40%, #c9d4ea 90%)'
    }}
  >
    {children}
  </div>
);

const baseStyle: React.CSSProperties = {
  width: 240,
  height: 120,
  borderRadius: 24,
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif'
};

type CSSVarStyle = React.CSSProperties & {
  ['--lg-backdrop-filter']?: string;
};

const displacementStyle: CSSVarStyle = {
  ...baseStyle,
  '--lg-backdrop-filter': 'url(#lg-displacement) blur(18px) saturate(1.6)'
};

const DisplacementFilter = () => (
  <svg
    width="0"
    height="0"
    style={{ position: 'absolute' }}
    aria-hidden="true"
  >
    <filter id="lg-displacement">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.015"
        numOctaves={2}
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="18"
        xChannelSelector="R"
        yChannelSelector="G"
      />
      <feGaussianBlur stdDeviation="2" />
    </filter>
  </svg>
);

const meta: Meta<typeof LiquidGlassView> = {
  title: 'LiquidGlass/LiquidGlassView',
  component: LiquidGlassView,
  args: {
    effect: 'regular',
    interactive: false,
    colorScheme: 'system',
    style: baseStyle,
    children: <div>Liquid glass</div>
  },
  argTypes: {
    effect: {
      control: { type: 'select' },
      options: ['regular', 'clear', 'none']
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['system', 'light', 'dark']
    }
  }
};

export default meta;

type Story = StoryObj<typeof LiquidGlassView>;

export const Regular: Story = {
  render: (args) => (
    <Frame>
      <LiquidGlassView {...args} />
    </Frame>
  )
};

export const Clear: Story = {
  args: {
    effect: 'clear'
  },
  render: (args) => (
    <Frame>
      <LiquidGlassView {...args} />
    </Frame>
  )
};

export const None: Story = {
  args: {
    effect: 'none'
  },
  render: (args) => (
    <Frame>
      <LiquidGlassView {...args} />
    </Frame>
  )
};

export const Interactive: Story = {
  args: {
    interactive: true
  },
  render: (args) => (
    <Frame>
      <LiquidGlassView {...args} />
    </Frame>
  )
};

export const Tinted: Story = {
  args: {
    tintColor: 'rgba(0, 120, 255, 0.4)'
  },
  render: (args) => (
    <Frame>
      <LiquidGlassView {...args} />
    </Frame>
  )
};

export const DarkScheme: Story = {
  args: {
    colorScheme: 'dark',
    style: { ...baseStyle, color: '#f3f5ff' }
  },
  render: (args) => (
    <Frame>
      <LiquidGlassView {...args} />
    </Frame>
  )
};

export const Displacement: Story = {
  args: {
    effect: 'clear',
    style: displacementStyle
  },
  render: (args) => (
    <Frame>
      <DisplacementFilter />
      <LiquidGlassView {...args}>
        <div>Displacement filter</div>
      </LiquidGlassView>
    </Frame>
  )
};
