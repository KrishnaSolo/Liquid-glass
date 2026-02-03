/**
 * Detects whether the browser supports the CSS backdrop-filter property
 * which is required for the liquid glass effect.
 *
 * @returns true if backdrop-filter is supported, false otherwise
 */
function detectBackdropFilterSupport(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined' || typeof CSS === 'undefined') {
    return false;
  }

  // Check for CSS.supports availability
  if (typeof CSS.supports === 'function') {
    return (
      CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    );
  }

  // Fallback: try to detect support by creating a test element
  try {
    const testEl = document.createElement('div');
    testEl.style.cssText = 'backdrop-filter: blur(1px); -webkit-backdrop-filter: blur(1px)';
    // Check both standard and webkit-prefixed property
    const styleDecl = testEl.style as CSSStyleDeclaration & { webkitBackdropFilter?: string };
    return (
      testEl.style.backdropFilter !== '' ||
      (styleDecl.webkitBackdropFilter !== undefined && styleDecl.webkitBackdropFilter !== '')
    );
  } catch {
    return false;
  }
}

/**
 * Boolean constant indicating whether the current browser supports
 * the liquid glass effect (CSS backdrop-filter).
 *
 * Use this to conditionally render fallback UI on unsupported browsers.
 *
 * @example
 * ```tsx
 * import { isLiquidGlassSupported, LiquidGlassView } from '@liquid-glass/react';
 *
 * function MyComponent() {
 *   return (
 *     <LiquidGlassView
 *       style={!isLiquidGlassSupported ? { backgroundColor: 'rgba(255,255,255,0.5)' } : undefined}
 *     >
 *       Content
 *     </LiquidGlassView>
 *   );
 * }
 * ```
 */
export const isLiquidGlassSupported: boolean = detectBackdropFilterSupport();
