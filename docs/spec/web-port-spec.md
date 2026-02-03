## Web port spec for Liquid Glass (React)

### Goals
- Provide a web React component library that mirrors the React Native API:
  - LiquidGlassView
  - LiquidGlassContainerView
  - isLiquidGlassSupported
- Match the qualitative visuals and interaction behavior as closely as web APIs allow.
- Keep the API surface small, consistent, and extensible.
- Provide verification via Storybook and automated tests.
- Support SSR-safe rendering and graceful fallbacks.

### Non-goals
- Re-implement native iOS UIGlassEffect pixel-perfect behavior.
- Add new props not present in the RN API unless required for web parity.
- Depend on GPU-heavy shaders or WebGL by default (can be layered later).

### API mapping

#### LiquidGlassView props
| RN prop       | Web mapping                                                                 |
|--------------|------------------------------------------------------------------------------|
| interactive  | Enables press feedback (scale and shimmer overlay).                          |
| effect       | Controls blur/opacity level: clear, regular, or none (no effect).            |
| tintColor    | Applies a color overlay to the glass layer via CSS variables.                |
| colorScheme  | Forces light/dark rendering or uses system preference for "system".          |

#### LiquidGlassContainerView props
| RN prop   | Web mapping                                                                 |
|----------|------------------------------------------------------------------------------|
| spacing  | Provides a merge threshold to children via context and CSS variables.        |

#### isLiquidGlassSupported
Web detection uses CSS.supports for backdrop-filter / -webkit-backdrop-filter.
Falls back to false for SSR or when CSS is unavailable.

### Component behavior
- LiquidGlassView uses a single div with pseudo-elements for highlights.
- CSS variables control blur, opacity, tint, and interaction visuals.
- "none" effect disables backdrop-filter and removes decorations.
- "clear" reduces blur and background opacity compared to "regular".
- Interactive state uses :active to drive a subtle scale and shimmer.

### Container behavior
- LiquidGlassContainerView provides spacing to children via React context.
- Children read spacing and apply it to CSS variables (merge heuristics).
- Container does not force layout (no flex or grid) to avoid unexpected changes.

### Styling strategy
- CSS variables allow fine control and theming:
  - --lg-blur
  - --lg-saturation
  - --lg-bg-opacity
  - --lg-border-opacity
  - --lg-tint-color
  - --lg-merge-spacing
  - --lg-highlight-opacity
- Data attributes drive variant rules:
  - data-effect
  - data-interactive
  - data-scheme

### Performance considerations
- Use backdrop-filter only when effect is not "none".
- Use will-change and contain where applicable.
- Avoid heavy box-shadow stacks; use a single shadow plus overlay.
- Avoid layout thrashing by limiting DOM nodes (one element + pseudo-elements).

### Accessibility
- No ARIA roles by default; consumers provide as needed.
- Ensure no focus traps or pointer blocking on overlays (pointer-events: none).
- Keep color scheme alignment with prefers-color-scheme when in "system".

### SSR and hydration
- isLiquidGlassSupported returns false on server.
- Components render safely without window or CSS access.

### Verification plan

#### Storybook (manual and visual verification)
- Story: default view (regular)
- Story: clear vs regular vs none
- Story: interactive on/off
- Story: tintColor variations
- Story: light/dark/system colorScheme
- Story: container spacing interactions

#### Automated tests (Vitest + React Testing Library)
- LiquidGlassView:
  - Defaults: effect=regular, interactive=false, colorScheme=system.
  - Data attributes and CSS variables set correctly.
  - Effect "none" disables class-based effect rule.
- LiquidGlassContainerView:
  - Provides spacing via context.
  - Sets CSS variable on container.
- isLiquidGlassSupported:
  - False in jsdom when CSS.supports is missing.

#### Drift prevention
- Each implementation phase includes a verification step:
  - Phase 1: scaffold + build config (no tests yet).
  - Phase 2: component implementation verified in Storybook.
  - Phase 3: tests for props and CSS variables.
  - Phase 4: final review and integration run.

### Implementation phases
1. Scaffold library structure and base configuration.
2. Implement components and CSS (core visuals).
3. Add Storybook with stories covering the API surface.
4. Add unit tests and jsdom setup.
5. Run tests and review implementation for parity and quality.
