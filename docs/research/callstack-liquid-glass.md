## Callstack Liquid Glass (React Native) research notes

### Source and scope
- Repository: callstack/liquid-glass
- Package name: @callstack/liquid-glass
- Platforms: iOS and tvOS only. Android and other platforms fall back.

### Public API surface (TypeScript)
Exports (src/index.tsx):
- LiquidGlassView
- LiquidGlassContainerView
- isLiquidGlassSupported
- LiquidGlassViewProps (NativeProps from native component)
- LiquidGlassContainerViewProps (NativeProps from native component)

LiquidGlassView props (src/LiquidGlassViewNativeComponent.ts):
- interactive?: boolean (default false)
  - Enables touch interaction effects (grow on touch and shimmer).
  - Note: README lists known issue that interactive is only set on mount.
- effect?: 'clear' | 'regular' | 'none' (default 'regular')
  - 'clear' is more transparent.
  - 'regular' is standard blur.
  - 'none' removes glass effect but remains a transparent view.
  - Changing effect animates materialization/dematerialization.
- tintColor?: ColorValue (optional)
  - Overlay tint color applied to glass.
- colorScheme?: 'light' | 'dark' | 'system' (default 'system')
  - Controls appearance and adapts to system when set to 'system'.

LiquidGlassContainerView props (src/LiquidGlassViewContainerNativeComponent.ts):
- spacing?: number (default 0)
  - The distance between child elements at which they begin to merge.

Utility:
- isLiquidGlassSupported: boolean constant
  - iOS 26+ check with runtime guard and Info.plist compatibility flag.
  - Non-iOS builds export false.

### JS implementation details
- Non-iOS fallback uses a regular View for both LiquidGlassView and LiquidGlassContainerView.
- isLiquidGlassSupported is false on non-iOS platforms.
- iOS builds export native components using codegenNativeComponent.

### Native implementation details (iOS)

#### LiquidGlassView.swift (UIVisualEffectView)
- Uses UIGlassEffect (iOS 26) and UIGlassEffect.Style for clear/regular.
- style of "none" sets effect to a UIVisualEffect (note: TODO mentions nil assignment issues).
- interactive toggles UIGlassEffect.isInteractive.
- tintColor forwards to UIGlassEffect.tintColor.
- setupView is guarded by:
  - iOS/tvOS availability check
  - runtime presence of UIGlassEffect class
  - runtime presence of effectWithStyle selector
- effect is assigned on first mount and animated when updated later.

#### LiquidGlassView.mm (React Native Fabric)
- Wraps LiquidGlassViewImpl and forwards props:
  - effect -> style
  - interactive -> isInteractive
  - tintColor -> effectTintColor
  - colorScheme -> overrideUserInterfaceStyle
- Uses layoutSubviews to sync corner radius.
- Uses resolveBorderMetrics for complex border radii.
- Moves children into _view.contentView to preserve correct composition.

#### LiquidGlassContainerView.swift (UIVisualEffectView)
- Uses UIGlassContainerEffect with spacing.

#### LiquidGlassContainerView.mm
- Forwards spacing updates to native view.
- Mounts children into contentView.

#### NativeLiquidGlassModule
- Exports constants: isLiquidGlassSupported.
- Supported when:
  - iOS/tvOS 26+
  - UIDesignRequiresCompatibility is false in Info.plist.

### Behavioral notes and edge cases
- There is a known issue: interactive prop does not update dynamically (only on mount).
- Support check is both compile-time and runtime guarded for early iOS 26 betas.
- Layout and border radii are handled natively for correct corner rendering.

### Implications for web port
- The API surface is small and prop-based.
- Key behaviors to mirror: effect modes, tinting, interaction shimmer, color scheme, and spacing-based merge for container.
- Need a runtime support check similar in spirit to isLiquidGlassSupported.
