# @liquid-glass/react

<div align="center">
  <h2>Liquid Glass for React Web 🔍</h2>
  
  <p>A web port of the <a href="https://github.com/callstack/liquid-glass">callstack/liquid-glass</a> React Native library.</p>
  
  <p>Bring iOS 26's beautiful liquid glass effect to your web applications.</p>
</div>

## Features

- ✨ iOS 26 liquid glass visual effect using CSS backdrop-filter
- 🎨 Customizable tint colors
- 🔧 Three effect modes: `clear`, `regular`, and `none`
- 🌓 Light/dark/system color scheme support
- 👆 Interactive hover and press effects
- 📦 Tiny bundle size (~11KB minified)
- 🔒 Full TypeScript support

## Installation

```bash
npm install @liquid-glass/react
# or
yarn add @liquid-glass/react
# or
pnpm add @liquid-glass/react
```

## Usage

```tsx
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
} from '@liquid-glass/react';

function MyComponent() {
  return (
    <LiquidGlassView
      style={{
        width: 200,
        height: 100,
        borderRadius: 20,
        padding: 20,
      }}
      effect="regular"
      interactive
    >
      <span style={{ color: 'white' }}>Hello World</span>
    </LiquidGlassView>
  );
}

// For combining multiple glass elements
function MergingGlassElements() {
  return (
    <LiquidGlassContainerView
      spacing={20}
      style={{ display: 'flex', gap: 10 }}
    >
      <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
      <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
    </LiquidGlassContainerView>
  );
}
```

### Fallback for Unsupported Browsers

```tsx
import { isLiquidGlassSupported, LiquidGlassView } from '@liquid-glass/react';

function MyComponent() {
  return (
    <LiquidGlassView
      style={{
        borderRadius: 20,
        padding: 20,
        // Fallback background for unsupported browsers
        ...(!isLiquidGlassSupported && {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }),
      }}
    >
      <span>Content</span>
    </LiquidGlassView>
  );
}
```

## API

### `isLiquidGlassSupported`

A boolean constant that indicates whether the current browser supports the liquid glass effect (CSS `backdrop-filter`).

```tsx
import { isLiquidGlassSupported } from '@liquid-glass/react';

if (isLiquidGlassSupported) {
  // Browser supports liquid glass effect
} else {
  // Provide fallback UI
}
```

### LiquidGlassView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `interactive` | `boolean` | `false` | Enables hover/press interaction effects (scale, shimmer) |
| `effect` | `'clear' \| 'regular' \| 'none'` | `'regular'` | Visual effect mode:<br/>• `clear` - More transparent glass effect<br/>• `regular` - Standard glass blur effect<br/>• `none` - No glass effect |
| `tintColor` | `string` | `undefined` | Overlay color tint (any CSS color value) |
| `colorScheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Color scheme:<br/>• `light` - Light appearance<br/>• `dark` - Dark appearance<br/>• `system` - Follows system preference |

Plus all standard HTML div attributes (`className`, `style`, `onClick`, etc.)

### LiquidGlassContainerView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `0` | Distance (px) at which child glass elements begin to merge |

Plus all standard HTML div attributes.

## Examples

### Weather Widget

```tsx
<LiquidGlassView
  effect="regular"
  interactive
  colorScheme="dark"
  style={{
    padding: 20,
    borderRadius: 20,
    minWidth: 170,
  }}
>
  <p style={{ color: 'white' }}>San Francisco</p>
  <p style={{ color: 'white', fontSize: 48 }}>72°</p>
  <p>☀️</p>
  <p style={{ color: 'white', opacity: 0.7 }}>Sunny</p>
</LiquidGlassView>
```

### Button

```tsx
<LiquidGlassView
  effect="regular"
  interactive
  colorScheme="dark"
  style={{
    padding: '16px 32px',
    borderRadius: 16,
    cursor: 'pointer',
  }}
  onClick={() => console.log('clicked')}
>
  <span style={{ color: 'white', fontWeight: 600 }}>Click Me</span>
</LiquidGlassView>
```

### Toolbar

```tsx
<LiquidGlassView
  effect="regular"
  style={{
    padding: '8px 16px',
    borderRadius: 30,
    display: 'flex',
    gap: 16,
  }}
>
  <span style={{ padding: 8, color: 'white' }}>File</span>
  <span style={{ padding: 8, color: 'white' }}>Edit</span>
  <span style={{ padding: 8, color: 'white' }}>View</span>
</LiquidGlassView>
```

### With Tint Color

```tsx
<LiquidGlassView
  effect="clear"
  tintColor="orange"
  interactive
  style={{ padding: 20, borderRadius: 20 }}
>
  <span style={{ color: 'white' }}>Orange Tinted Glass</span>
</LiquidGlassView>
```

## Browser Support

The liquid glass effect requires CSS `backdrop-filter` support:

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 76+ | ✅ Full |
| Firefox | 103+ | ✅ Full |
| Safari | 9+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| iOS Safari | 9+ | ✅ Full |

For unsupported browsers, `isLiquidGlassSupported` returns `false` and you can provide fallback styling.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run Storybook
npm run storybook

# Build library
npm run build

# Type check
npm run typecheck
```

## Acknowledgments

This library is a web port of the excellent [callstack/liquid-glass](https://github.com/callstack/liquid-glass) React Native library. All credit for the original API design and concept goes to the Callstack team.

## License

MIT
