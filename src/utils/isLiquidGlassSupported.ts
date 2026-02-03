export const isLiquidGlassSupported = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return false;
  }

  return (
    CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
  );
})();
