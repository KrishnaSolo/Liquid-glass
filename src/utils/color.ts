/**
 * Parses a CSS color string and returns RGBA components
 * Supports hex (#RGB, #RGBA, #RRGGBB, #RRGGBBAA), rgb(), rgba(), and named colors
 */
export function parseColor(color: string): { r: number; g: number; b: number; a: number } | null {
  // Handle transparent
  if (color === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    let r: number, g: number, b: number, a = 1;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 4) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
      a = parseInt(hex[3] + hex[3], 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    } else {
      return null;
    }

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      return null;
    }

    return { r, g, b, a };
  }

  // Handle rgb() and rgba()
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      return null;
    }

    return { r, g, b, a };
  }

  return null;
}

/**
 * Converts RGBA components to a CSS rgba() string
 */
export function toRgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Applies a tint color to the glass background
 * Blends the tint color with the base glass color at reduced opacity
 */
export function applyTintToBackground(
  baseBackground: string,
  tintColor: string | undefined
): string {
  if (!tintColor) {
    return baseBackground;
  }

  const tint = parseColor(tintColor);
  if (!tint) {
    return baseBackground;
  }

  // Mix tint at 30% opacity for subtle effect
  const tintAlpha = Math.min(tint.a * 0.3, 0.4);
  return toRgba(tint.r, tint.g, tint.b, tintAlpha);
}
