## Frontend Masters blog: "Liquid Glass on the Web"

Source: https://frontendmasters.com/blog/liquid-glass-on-the-web/

### Key takeaways
- The true liquid glass aesthetic is more than blur:
  - Refraction/distortion of the background.
  - Edge highlights and specular shine.
  - Varying frost levels and textured glass.
- Accessibility: text contrast over unknown backgrounds is a major risk.
  - Frosting and overlays can help, but contrast must be verified.
- Advanced techniques for realism:
  - `backdrop-filter: url(#svg-filter)` with `feDisplacementMap` +
    `feGaussianBlur`.
  - SVG filters can create refraction without heavy blur.

### How this informs the web port
- The current CSS already includes:
  - Highlight overlay (`::after` shimmer).
  - Subtle tint overlay (`::before`).
  - Blur/saturation backdrop filter.
- Added an opt-in CSS variable to support SVG filter displacement:
  - `--lg-backdrop-filter` can be set to `url(#filter) blur(...)`.
  - This maps directly to the blog's `backdrop-filter` technique.
- Storybook includes a new "Displacement" story to visualize this option.

### Accessibility notes
- The blog calls out text contrast risks explicitly.
- Our implementation includes:
  - `prefers-reduced-motion` for animation safety.
  - `prefers-contrast: more` to boost borders/highlights.
  - Fallback styling when backdrop-filter is unavailable.
