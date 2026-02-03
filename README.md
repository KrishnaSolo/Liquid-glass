## Liquid Glass Web

Liquid glass effect components for React on the web. This is a web port of
Callstack's React Native Liquid Glass library with a matching API surface.

### Installation

```bash
npm install liquid-glass-web
```

### Usage

Import the CSS once in your app entry:

```ts
import 'liquid-glass-web/styles.css';
```

Then use the components:

```tsx
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported
} from 'liquid-glass-web';

export function Example() {
  return (
    <LiquidGlassView
      style={{ width: 240, height: 120, borderRadius: 24 }}
      interactive
      effect="clear"
      tintColor="rgba(0, 120, 255, 0.25)"
      colorScheme="system"
    >
      <div style={{ padding: 20 }}>Hello world</div>
    </LiquidGlassView>
  );
}

export function MergingExample() {
  return (
    <LiquidGlassContainerView spacing={20}>
      <LiquidGlassView style={{ width: 120, height: 120, borderRadius: 60 }} />
      <LiquidGlassView style={{ width: 120, height: 120, borderRadius: 60 }} />
    </LiquidGlassContainerView>
  );
}

if (!isLiquidGlassSupported) {
  // Provide a fallback if backdrop-filter is not available.
}
```

### API

#### LiquidGlassView props

- interactive?: boolean (default false)
- effect?: 'clear' | 'regular' | 'none' (default regular)
- tintColor?: string
- colorScheme?: 'light' | 'dark' | 'system' (default system)

All standard div attributes are supported.

#### LiquidGlassContainerView props

- spacing?: number (default 0)

All standard div attributes are supported.

### Browser support

The effect requires CSS backdrop-filter support. The library provides a
runtime check via isLiquidGlassSupported and falls back to normal rendering
when the effect is unavailable.

### Development

- Build: npm run build
- Test: npm run test
- Storybook: npm run storybook
