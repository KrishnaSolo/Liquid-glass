import React from 'react';

export type LiquidGlassContainerContextValue = {
  spacing?: number;
};

const LiquidGlassContainerContext =
  React.createContext<LiquidGlassContainerContextValue | null>(null);

export const useLiquidGlassContainer = () =>
  React.useContext(LiquidGlassContainerContext);

export const LiquidGlassContainerProvider = ({
  spacing,
  children
}: {
  spacing?: number;
  children: React.ReactNode;
}) => {
  return (
    <LiquidGlassContainerContext.Provider value={{ spacing }}>
      {children}
    </LiquidGlassContainerContext.Provider>
  );
};
