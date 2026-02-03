import type { Meta, StoryObj } from '@storybook/react';
import { LiquidGlassContainerView } from './LiquidGlassContainerView';
import { LiquidGlassView } from './LiquidGlassView';
import { useState, useEffect } from 'react';

const meta: Meta<typeof LiquidGlassContainerView> = {
  title: 'Components/LiquidGlassContainerView',
  component: LiquidGlassContainerView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A container view that renders multiple glass elements into a combined effect.

When \`LiquidGlassView\` children are placed within this container and are
within the specified spacing distance, their glass effects visually merge
to create a unified glass surface.

The \`spacing\` prop controls the distance at which merging begins.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Distance at which children begin merging effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidGlassContainerView>;

const circleStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  color: 'white',
};

/**
 * Basic container with multiple glass elements.
 */
export const Basic: Story = {
  args: {
    spacing: 20,
    style: {
      display: 'flex',
      gap: '10px',
      padding: '20px',
    },
    children: (
      <>
        <LiquidGlassView effect="clear" style={circleStyle}>
          1
        </LiquidGlassView>
        <LiquidGlassView effect="clear" style={circleStyle}>
          2
        </LiquidGlassView>
      </>
    ),
  },
};

/**
 * Three circles in a row demonstrating the merging effect.
 */
export const ThreeCircles: Story = {
  args: {
    spacing: 30,
    style: {
      display: 'flex',
      gap: '15px',
      padding: '20px',
    },
    children: (
      <>
        <LiquidGlassView effect="regular" interactive style={circleStyle}>
          A
        </LiquidGlassView>
        <LiquidGlassView effect="regular" interactive style={circleStyle}>
          B
        </LiquidGlassView>
        <LiquidGlassView effect="regular" interactive style={circleStyle}>
          C
        </LiquidGlassView>
      </>
    ),
  },
};

/**
 * Interactive animation showing circles merging when they get close.
 */
export const MergingAnimation: Story = {
  render: function MergingAnimationRender() {
    const [offset, setOffset] = useState(50);
    const [merged, setMerged] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setMerged((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      setOffset(merged ? -20 : 50);
    }, [merged]);

    return (
      <div style={{ textAlign: 'center' }}>
        <LiquidGlassContainerView
          spacing={30}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            minWidth: '300px',
          }}
        >
          <LiquidGlassView effect="clear" style={circleStyle}>
            1
          </LiquidGlassView>
          <LiquidGlassView
            effect="clear"
            style={{
              ...circleStyle,
              transform: `translateX(${offset}px)`,
              transition: 'transform 1s ease-in-out',
            }}
          >
            2
          </LiquidGlassView>
        </LiquidGlassContainerView>
        <p style={{ color: 'white', marginTop: '16px', opacity: 0.8 }}>
          {merged ? 'Merged!' : 'Separated'}
        </p>
      </div>
    );
  },
};

/**
 * Toggle between merged and separated states manually.
 */
export const ToggleMerge: Story = {
  render: function ToggleMergeRender() {
    const [merged, setMerged] = useState(false);

    return (
      <div style={{ textAlign: 'center' }}>
        <LiquidGlassContainerView
          spacing={20}
          style={{
            display: 'flex',
            gap: merged ? '5px' : '40px',
            padding: '20px',
            transition: 'gap 0.5s ease-out',
          }}
        >
          <LiquidGlassView effect="clear" interactive style={circleStyle}>
            1
          </LiquidGlassView>
          <LiquidGlassView effect="clear" interactive style={circleStyle}>
            2
          </LiquidGlassView>
        </LiquidGlassContainerView>
        <button
          onClick={() => setMerged((prev) => !prev)}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {merged ? 'Separate' : 'Merge'}
        </button>
      </div>
    );
  },
};

/**
 * Navigation bar with multiple glass elements.
 */
export const NavigationBar: Story = {
  args: {
    spacing: 10,
    style: {
      display: 'flex',
      gap: '8px',
      padding: '8px',
      borderRadius: '40px',
      background: 'rgba(255,255,255,0.05)',
    },
    children: (
      <>
        {['Home', 'Search', 'Profile', 'Settings'].map((label) => (
          <LiquidGlassView
            key={label}
            effect="regular"
            interactive
            style={{
              padding: '12px 20px',
              borderRadius: '30px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {label}
          </LiquidGlassView>
        ))}
      </>
    ),
  },
};

/**
 * Grid layout of glass cards.
 */
export const Grid: Story = {
  args: {
    spacing: 15,
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      padding: '20px',
    },
    children: (
      <>
        {[1, 2, 3, 4].map((num) => (
          <LiquidGlassView
            key={num}
            effect="regular"
            interactive
            style={{
              padding: '30px',
              borderRadius: '16px',
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {num}
          </LiquidGlassView>
        ))}
      </>
    ),
  },
};

/**
 * Mixed effects within a container.
 */
export const MixedEffects: Story = {
  args: {
    spacing: 20,
    style: {
      display: 'flex',
      gap: '15px',
      padding: '20px',
    },
    children: (
      <>
        <LiquidGlassView
          effect="regular"
          colorScheme="dark"
          style={{ ...circleStyle, width: '120px', height: '120px' }}
        >
          Dark
        </LiquidGlassView>
        <LiquidGlassView
          effect="clear"
          tintColor="#4ecdc4"
          style={circleStyle}
        >
          Tinted
        </LiquidGlassView>
        <LiquidGlassView
          effect="regular"
          interactive
          style={circleStyle}
        >
          Active
        </LiquidGlassView>
      </>
    ),
  },
};

/**
 * Vertical stack of glass elements.
 */
export const VerticalStack: Story = {
  args: {
    spacing: 10,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '20px',
    },
    children: (
      <>
        {['First', 'Second', 'Third'].map((label) => (
          <LiquidGlassView
            key={label}
            effect="regular"
            interactive
            style={{
              padding: '20px 40px',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {label}
          </LiquidGlassView>
        ))}
      </>
    ),
  },
};

/**
 * Spacing comparison showing different merge distances.
 */
export const SpacingComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {[0, 20, 50].map((spacing) => (
        <div key={spacing} style={{ textAlign: 'center' }}>
          <p style={{ color: 'white', marginBottom: '10px', fontSize: '14px' }}>
            spacing={spacing}
          </p>
          <LiquidGlassContainerView
            spacing={spacing}
            style={{
              display: 'flex',
              gap: '20px',
              padding: '15px',
            }}
          >
            <LiquidGlassView effect="clear" style={{ ...circleStyle, width: '80px', height: '80px' }}>
              A
            </LiquidGlassView>
            <LiquidGlassView effect="clear" style={{ ...circleStyle, width: '80px', height: '80px' }}>
              B
            </LiquidGlassView>
          </LiquidGlassContainerView>
        </div>
      ))}
    </div>
  ),
};
