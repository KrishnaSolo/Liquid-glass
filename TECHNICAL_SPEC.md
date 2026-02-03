# Liquid Glass Web - Technical Specification

## 1. Research Summary: Callstack React Native Liquid Glass Library

### 1.1 Overview
The original `@callstack/liquid-glass` library brings iOS 26's "Liquid Glass" visual effect to React Native apps. This effect creates a dynamic, translucent glass-like appearance that blurs and adapts to background content.

### 1.2 Original API Surface

#### Exported Components
1. **LiquidGlassView** - Primary glass effect component
2. **LiquidGlassContainerView** - Container for merging multiple glass elements
3. **isLiquidGlassSupported** - Boolean utility for feature detection

#### LiquidGlassView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `interactive` | `boolean` | `false` | Enables touch interaction effects (grow on touch, shimmer) |
| `effect` | `'clear' \| 'regular' \| 'none'` | `'regular'` | Visual effect mode: clear (more transparent), regular (standard blur), none (no effect) |
| `tintColor` | `ColorValue` | `undefined` | Overlay color tint applied to the glass effect |
| `colorScheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Color scheme adaptation |
| + All standard View props (style, children, etc.)

#### LiquidGlassContainerView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `0` | Distance at which child elements begin to merge their glass effects |
| + All standard View props

### 1.3 Original Implementation Details

#### iOS Native Layer
- Uses `UIVisualEffectView` with `UIGlassEffect` (iOS 26+)
- Effect styles map to `UIGlassEffect.Style`: `.regular`, `.clear`, `nil`
- Interactive mode sets `glassEffect.isInteractive = true`
- Container uses `UIGlassContainerEffect` with spacing property
- Supports corner radius configuration via `UICornerConfiguration`
- Color scheme via `overrideUserInterfaceStyle`

#### Fallback Behavior
- On unsupported platforms: renders as plain `View` component
- `isLiquidGlassSupported` returns `false` on non-iOS/pre-iOS 26

---

## 2. Web Implementation Strategy

### 2.1 Core Technology: CSS Backdrop Filter

The web implementation will leverage the `backdrop-filter` CSS property to achieve similar visual effects:

```css
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
```

### 2.2 Effect Mapping

| RN Effect | Web CSS Implementation |
|-----------|----------------------|
| `'regular'` | `backdrop-filter: blur(20px) saturate(180%); background: rgba(255,255,255,0.25)` |
| `'clear'` | `backdrop-filter: blur(12px) saturate(120%); background: rgba(255,255,255,0.1)` |
| `'none'` | `backdrop-filter: none; background: transparent` |

### 2.3 Color Scheme Mapping

| Scheme | Web Implementation |
|--------|-------------------|
| `'system'` | CSS `prefers-color-scheme` media query |
| `'light'` | Force light appearance styles |
| `'dark'` | Force dark appearance styles |

### 2.4 Interactive Mode

Web interactive effects:
- Scale transform on hover/active states
- Subtle shimmer effect via CSS animation gradient
- Transition animations for smooth state changes

### 2.5 Container Merging Effect

The `LiquidGlassContainerView` merging behavior will be simulated using:
- CSS custom properties for spacing awareness
- Shared backdrop-filter context
- Proximity-based visual blending via overlapping blur regions

---

## 3. API Design (Web)

### 3.1 LiquidGlassView Props

```typescript
interface LiquidGlassViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Enables hover/active interaction effects
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Visual effect mode
   * - 'regular': Standard glass blur effect
   * - 'clear': More transparent glass effect  
   * - 'none': No glass effect (transparent)
   * @default 'regular'
   */
  effect?: 'clear' | 'regular' | 'none';
  
  /**
   * Overlay color tint applied to the glass effect
   * Accepts any valid CSS color value
   */
  tintColor?: string;
  
  /**
   * Color scheme adaptation
   * - 'light': Light appearance
   * - 'dark': Dark appearance
   * - 'system': Follows system preference
   * @default 'system'
   */
  colorScheme?: 'light' | 'dark' | 'system';
  
  /**
   * React children
   */
  children?: React.ReactNode;
}
```

### 3.2 LiquidGlassContainerView Props

```typescript
interface LiquidGlassContainerViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Distance (px) at which children begin merging effects
   * @default 0
   */
  spacing?: number;
  
  children?: React.ReactNode;
}
```

### 3.3 Utility Export

```typescript
/**
 * Boolean indicating if backdrop-filter is supported
 * Checks for CSS backdrop-filter browser support
 */
export const isLiquidGlassSupported: boolean;
```

---

## 4. Implementation Architecture

```
src/
├── index.ts                      # Main entry point, exports all public API
├── LiquidGlassView.tsx           # Primary glass effect component
├── LiquidGlassContainerView.tsx  # Container for merging glass elements
├── isLiquidGlassSupported.ts     # Browser feature detection
├── hooks/
│   ├── useGlassEffect.ts         # Hook for glass effect styles
│   ├── useColorScheme.ts         # Hook for color scheme detection
│   └── useInteractive.ts         # Hook for interactive state
├── styles/
│   ├── glass.css                 # Base glass effect styles
│   └── animations.css            # Interactive animations
├── types/
│   └── index.ts                  # TypeScript type definitions
└── utils/
    └── color.ts                  # Color manipulation utilities
```

---

## 5. Browser Support

### 5.1 backdrop-filter Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 76+ | ✅ Full |
| Firefox | 103+ | ✅ Full |
| Safari | 9+ | ✅ Full (prefixed) |
| Edge | 79+ | ✅ Full |
| iOS Safari | 9+ | ✅ Full |

### 5.2 Fallback Strategy

For browsers without `backdrop-filter` support:
- Solid semi-transparent background
- Graceful degradation with `isLiquidGlassSupported = false`

---

## 6. Testing Strategy

### 6.1 Unit Tests
- Component rendering with all prop combinations
- Event handler verification (hover, click)
- Style application validation
- Accessibility compliance (ARIA attributes)

### 6.2 Visual Tests (Storybook)
- All effect modes (clear, regular, none)
- Color scheme variations
- Interactive states
- Container merging behavior
- Responsive layouts
- Edge cases (nested glass, overflow)

### 6.3 Integration Tests
- Real browser rendering
- Performance benchmarks
- Animation smoothness

---

## 7. Verification Checkpoints

### Phase 1: Setup ✓
- [ ] Project structure created
- [ ] Build configuration working
- [ ] TypeScript compiling

### Phase 2: Core Components
- [ ] LiquidGlassView renders correctly
- [ ] All props functional
- [ ] Effects match specification

### Phase 3: Container
- [ ] LiquidGlassContainerView works
- [ ] Spacing behavior correct
- [ ] Children render properly

### Phase 4: Testing
- [ ] All unit tests pass
- [ ] Storybook stories complete
- [ ] Visual verification done

### Phase 5: Polish
- [ ] Code review complete
- [ ] Documentation updated
- [ ] Ready for release

---

## 8. Performance Considerations

1. **GPU Acceleration**: backdrop-filter is hardware-accelerated
2. **Repaint Optimization**: Use `will-change: backdrop-filter` sparingly
3. **Animation Performance**: CSS transitions preferred over JS
4. **Memory**: Avoid excessive nested glass elements

---

## 9. Accessibility

- Proper contrast ratios maintained
- Focus indicators visible through glass
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader compatible (semantic HTML)
