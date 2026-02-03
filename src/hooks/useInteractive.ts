import { useState, useCallback, useRef } from 'react';
import type { InteractiveState } from '../types';

interface UseInteractiveOptions {
  enabled?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
}

interface UseInteractiveReturn {
  state: InteractiveState;
  handlers: {
    onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
    onMouseDown: React.MouseEventHandler<HTMLDivElement>;
    onMouseUp: React.MouseEventHandler<HTMLDivElement>;
  };
}

/**
 * Hook that manages interactive state (hover/press) for glass components
 *
 * @param options - Configuration options
 * @returns Interactive state and event handlers
 */
export function useInteractive(options: UseInteractiveOptions = {}): UseInteractiveReturn {
  const {
    enabled = false,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
  } = options;

  const [state, setState] = useState<InteractiveState>({
    isHovered: false,
    isPressed: false,
  });

  // Track if we're still mounted to avoid state updates after unmount
  const mountedRef = useRef(true);

  const handleMouseEnter = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (enabled && mountedRef.current) {
        setState((prev) => ({ ...prev, isHovered: true }));
      }
      onMouseEnter?.(e);
    },
    [enabled, onMouseEnter]
  );

  const handleMouseLeave = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (enabled && mountedRef.current) {
        setState({ isHovered: false, isPressed: false });
      }
      onMouseLeave?.(e);
    },
    [enabled, onMouseLeave]
  );

  const handleMouseDown = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (enabled && mountedRef.current) {
        setState((prev) => ({ ...prev, isPressed: true }));
      }
      onMouseDown?.(e);
    },
    [enabled, onMouseDown]
  );

  const handleMouseUp = useCallback<React.MouseEventHandler<HTMLDivElement>>(
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
      onMouseUp: handleMouseUp,
    },
  };
}
