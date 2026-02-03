import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'image',
          value: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200)',
        },
        {
          name: 'dark',
          value: '#1a1a2e',
        },
        {
          name: 'light',
          value: '#f5f5f5',
        },
        {
          name: 'colorful',
          value: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96c93d)',
        },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
