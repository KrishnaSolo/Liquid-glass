'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/LiquidGlassView.tsx
function useColorScheme(colorScheme = "system") {
  const getSystemColorScheme = react.useCallback(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);
  const [resolvedScheme, setResolvedScheme] = react.useState(() => {
    if (colorScheme === "system") {
      return getSystemColorScheme();
    }
    return colorScheme;
  });
  react.useEffect(() => {
    if (colorScheme !== "system") {
      setResolvedScheme(colorScheme);
      return;
    }
    setResolvedScheme(getSystemColorScheme());
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setResolvedScheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [colorScheme, getSystemColorScheme]);
  return resolvedScheme;
}
function useInteractive(options = {}) {
  const {
    enabled = false,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp
  } = options;
  const [state, setState] = react.useState({
    isHovered: false,
    isPressed: false
  });
  const mountedRef = react.useRef(true);
  const handleMouseEnter = react.useCallback(
    (e) => {
      if (enabled && mountedRef.current) {
        setState((prev) => ({ ...prev, isHovered: true }));
      }
      onMouseEnter?.(e);
    },
    [enabled, onMouseEnter]
  );
  const handleMouseLeave = react.useCallback(
    (e) => {
      if (enabled && mountedRef.current) {
        setState({ isHovered: false, isPressed: false });
      }
      onMouseLeave?.(e);
    },
    [enabled, onMouseLeave]
  );
  const handleMouseDown = react.useCallback(
    (e) => {
      if (enabled && mountedRef.current) {
        setState((prev) => ({ ...prev, isPressed: true }));
      }
      onMouseDown?.(e);
    },
    [enabled, onMouseDown]
  );
  const handleMouseUp = react.useCallback(
    (e) => {
      if (enabled && mountedRef.current) {
        setState((prev) => ({ ...prev, isPressed: false }));
      }
      onMouseUp?.(e);
    },
    [enabled, onMouseUp]
  );
  return {
    state,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp
    }
  };
}

// src/utils/color.ts
function parseColor(color) {
  if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    let r, g, b, a = 1;
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
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] !== void 0 ? parseFloat(rgbMatch[4]) : 1;
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      return null;
    }
    return { r, g, b, a };
  }
  return null;
}
function toRgba(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function applyTintToBackground(baseBackground, tintColor) {
  if (!tintColor) {
    return baseBackground;
  }
  const tint = parseColor(tintColor);
  if (!tint) {
    return baseBackground;
  }
  const tintAlpha = Math.min(tint.a * 0.3, 0.4);
  return toRgba(tint.r, tint.g, tint.b, tintAlpha);
}

// src/hooks/useGlassEffect.ts
var GLASS_EFFECTS = {
  regular: {
    light: {
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      backgroundColor: "rgba(255, 255, 255, 0.25)"
    },
    dark: {
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      backgroundColor: "rgba(0, 0, 0, 0.35)"
    }
  },
  clear: {
    light: {
      backdropFilter: "blur(12px) saturate(120%)",
      WebkitBackdropFilter: "blur(12px) saturate(120%)",
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    dark: {
      backdropFilter: "blur(12px) saturate(120%)",
      WebkitBackdropFilter: "blur(12px) saturate(120%)",
      backgroundColor: "rgba(0, 0, 0, 0.2)"
    }
  },
  none: {
    light: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      backgroundColor: "transparent"
    },
    dark: {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      backgroundColor: "transparent"
    }
  }
};
function useGlassEffect(options) {
  const {
    effect = "regular",
    colorScheme,
    tintColor,
    interactive = false,
    interactiveState = { isHovered: false, isPressed: false }
  } = options;
  const styles = react.useMemo(() => {
    const baseStyles = GLASS_EFFECTS[effect][colorScheme];
    let backgroundColor = baseStyles.backgroundColor;
    if (tintColor && effect !== "none") {
      const tintedBg = applyTintToBackground(backgroundColor, tintColor);
      backgroundColor = tintedBg;
    }
    let transform;
    if (interactive) {
      if (interactiveState.isPressed) {
        transform = "scale(0.97)";
      } else if (interactiveState.isHovered) {
        transform = "scale(1.02)";
      }
    }
    let boxShadow;
    if (interactive && effect !== "none") {
      if (interactiveState.isHovered) {
        boxShadow = colorScheme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)" : "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.3)";
      } else {
        boxShadow = colorScheme === "dark" ? "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.08)" : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)";
      }
    }
    return {
      backdropFilter: baseStyles.backdropFilter,
      WebkitBackdropFilter: baseStyles.WebkitBackdropFilter,
      backgroundColor,
      transform,
      boxShadow,
      // Smooth transitions for interactive effects
      transition: interactive ? "transform 0.2s ease-out, box-shadow 0.2s ease-out, backdrop-filter 0.3s ease-out, background-color 0.3s ease-out" : "backdrop-filter 0.3s ease-out, background-color 0.3s ease-out",
      // Hint browser for optimization
      willChange: interactive ? "transform, box-shadow" : void 0
    };
  }, [effect, colorScheme, tintColor, interactive, interactiveState]);
  return { styles };
}
var LiquidGlassView = react.forwardRef(
  function LiquidGlassView2(props, ref) {
    const {
      children,
      className,
      style,
      interactive = false,
      effect = "regular",
      tintColor,
      colorScheme = "system",
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    } = props;
    const resolvedColorScheme = useColorScheme(colorScheme);
    const { state: interactiveState, handlers } = useInteractive({
      enabled: interactive,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp
    });
    const { styles: glassStyles } = useGlassEffect({
      effect,
      colorScheme: resolvedColorScheme,
      tintColor,
      interactive,
      interactiveState
    });
    const combinedClassName = react.useMemo(() => {
      const classes = ["liquid-glass-view"];
      classes.push(`liquid-glass-view--${resolvedColorScheme}`);
      if (interactive) {
        classes.push("liquid-glass-view--interactive");
      }
      if (className) {
        classes.push(className);
      }
      return classes.join(" ");
    }, [resolvedColorScheme, interactive, className]);
    const combinedStyle = react.useMemo(() => {
      return {
        ...glassStyles,
        ...style
      };
    }, [glassStyles, style]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: combinedClassName,
        style: combinedStyle,
        ...handlers,
        ...rest,
        children
      }
    );
  }
);
LiquidGlassView.displayName = "LiquidGlassView";
var ContainerContext = react.createContext({
  isInContainer: false,
  spacing: 0
});
function useContainerContext() {
  return react.useContext(ContainerContext);
}
var LiquidGlassContainerView = react.forwardRef(function LiquidGlassContainerView2(props, ref) {
  const { children, className, style, spacing = 0, ...rest } = props;
  const contextValue = react.useMemo(
    () => ({
      isInContainer: true,
      spacing
    }),
    [spacing]
  );
  const combinedClassName = react.useMemo(() => {
    const classes = ["liquid-glass-container"];
    if (className) {
      classes.push(className);
    }
    return classes.join(" ");
  }, [className]);
  const processedChildren = react.useMemo(() => {
    return react.Children.map(children, (child) => {
      if (!react.isValidElement(child)) {
        return child;
      }
      return react.cloneElement(child, {
        ...child.props,
        "data-in-container": "true",
        "data-container-spacing": spacing
      });
    });
  }, [children, spacing]);
  const combinedStyle = react.useMemo(
    () => ({
      ...style,
      "--liquid-glass-container-spacing": `${spacing}px`
    }),
    [style, spacing]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(ContainerContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: combinedClassName,
      style: combinedStyle,
      ...rest,
      children: processedChildren
    }
  ) });
});
LiquidGlassContainerView.displayName = "LiquidGlassContainerView";

// src/isLiquidGlassSupported.ts
function detectBackdropFilterSupport() {
  if (typeof window === "undefined" || typeof CSS === "undefined") {
    return false;
  }
  if (typeof CSS.supports === "function") {
    return CSS.supports("backdrop-filter", "blur(1px)") || CSS.supports("-webkit-backdrop-filter", "blur(1px)");
  }
  try {
    const testEl = document.createElement("div");
    testEl.style.cssText = "backdrop-filter: blur(1px); -webkit-backdrop-filter: blur(1px)";
    const styleDecl = testEl.style;
    return testEl.style.backdropFilter !== "" || styleDecl.webkitBackdropFilter !== void 0 && styleDecl.webkitBackdropFilter !== "";
  } catch {
    return false;
  }
}
var isLiquidGlassSupported = detectBackdropFilterSupport();

exports.LiquidGlassContainerView = LiquidGlassContainerView;
exports.LiquidGlassView = LiquidGlassView;
exports.isLiquidGlassSupported = isLiquidGlassSupported;
exports.useColorScheme = useColorScheme;
exports.useContainerContext = useContainerContext;
exports.useGlassEffect = useGlassEffect;
exports.useInteractive = useInteractive;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map