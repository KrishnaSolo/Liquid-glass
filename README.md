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

### Advanced: SVG displacement

For a more refractive look, you can use an SVG filter and override the
backdrop-filter via a CSS variable:

```tsx
<svg width="0" height="0" aria-hidden="true">
  <filter id="lg-displacement">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.015"
      numOctaves="2"
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

<LiquidGlassView
  style={{
    width: 240,
    height: 120,
    borderRadius: 24,
    ['--lg-backdrop-filter' as string]:
      'url(#lg-displacement) blur(18px) saturate(1.6)'
  }}
/>
```

### Browser support

The effect requires CSS backdrop-filter support. The library provides a
runtime check via isLiquidGlassSupported and falls back to normal rendering
when the effect is unavailable.

### GitHub Pages hosting

The repository includes a GitHub Actions workflow that builds Storybook and
the docs site, then publishes them to GitHub Pages.

- Site index: https://<your-user>.github.io/<repo>/
- Docs: https://<your-user>.github.io/<repo>/docs/
- Storybook: https://<your-user>.github.io/<repo>/storybook/

### Development

- Build: npm run build
- Test: npm run test
- Storybook: npm run storybook
