import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { LiquidGlassContainerView, LiquidGlassView } from '../src';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: 48,
      minHeight: 260,
      background:
        'radial-gradient(circle at 80% 10%, #f7fafc, #e3ecf7 35%, #ccd9ef 90%)'
    }}
  >
    {children}
  </div>
);

const bubbleStyle: React.CSSProperties = {
  width: 120,
  height: 120,
  borderRadius: 60
};

const meta: Meta<typeof LiquidGlassContainerView> = {
  title: 'LiquidGlass/LiquidGlassContainerView',
  component: LiquidGlassContainerView,
  args: {
    spacing: 20,
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }
};

export default meta;

type Story = StoryObj<typeof LiquidGlassContainerView>;

export const Merged: Story = {
  render: (args) => (
    <Frame>
      <LiquidGlassContainerView {...args}>
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
      </LiquidGlassContainerView>
    </Frame>
  )
};

export const TightSpacing: Story = {
  args: {
    spacing: 6
  },
  render: (args) => (
    <Frame>
      <LiquidGlassContainerView {...args}>
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
      </LiquidGlassContainerView>
    </Frame>
  )
};
