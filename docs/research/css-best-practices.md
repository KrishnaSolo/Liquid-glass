## CSS best-practices checklist for glassmorphism

### Summary
This is a distilled set of CSS best practices applied to glass-like UI effects,
with concrete implications for the Liquid Glass web port. These guidelines
align with general front-end performance and accessibility guidance (including
common teachings from Frontend Masters courses) even though I cannot access
their courseware directly from this environment.

### Performance
- Keep the DOM minimal. Prefer a single element plus pseudo-elements.
- Avoid stacking multiple large blurs; one backdrop-filter is ideal.
- Prefer small box-shadow stacks; a single shadow is cheaper.
- Use CSS variables to tune effects without recomputing layout.
- Limit animations to opacity/transform for GPU-friendly updates.
- Use will-change sparingly and only on elements that animate.

### Progressive enhancement
- Use @supports to provide fallback styling when backdrop-filter is unavailable.
- Provide runtime checks (isLiquidGlassSupported) for app-level fallbacks.
- Avoid hard dependency on browser-only APIs for SSR.

### Accessibility
- Respect prefers-reduced-motion by disabling shimmer and scale animation.
- Respect prefers-contrast by increasing border and highlight opacity.
- Ensure overlays do not block pointer events (pointer-events: none).

### Color and theming
- Use CSS variables for tint and opacity to allow theming.
- Support prefers-color-scheme via data attributes and media queries.

### Applied changes in this repo
- Added prefers-reduced-motion and prefers-contrast handling.
- Added @supports fallback tuning for lack of backdrop-filter.
- Added --lg-backdrop-filter for optional SVG displacement filters.

### Optional future enhancements
- Add a reduced transparency mode for browsers with forced-colors.
- Add visual regression tests for Storybook stories.
