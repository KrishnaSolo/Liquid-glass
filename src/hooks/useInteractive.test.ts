import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInteractive } from './useInteractive';

describe('useInteractive', () => {
  describe('initial state', () => {
    it('returns initial state with isHovered and isPressed false', () => {
      const { result } = renderHook(() => useInteractive());
      expect(result.current.state).toEqual({
        isHovered: false,
        isPressed: false,
      });
    });

    it('provides all event handlers', () => {
      const { result } = renderHook(() => useInteractive());
      expect(result.current.handlers).toHaveProperty('onMouseEnter');
      expect(result.current.handlers).toHaveProperty('onMouseLeave');
      expect(result.current.handlers).toHaveProperty('onMouseDown');
      expect(result.current.handlers).toHaveProperty('onMouseUp');
    });
  });

  describe('when enabled', () => {
    it('sets isHovered to true on mouse enter', () => {
      const { result } = renderHook(() => useInteractive({ enabled: true }));
      
      act(() => {
        result.current.handlers.onMouseEnter({} as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.state.isHovered).toBe(true);
    });

    it('sets isHovered to false on mouse leave', () => {
      const { result } = renderHook(() => useInteractive({ enabled: true }));
      
      act(() => {
        result.current.handlers.onMouseEnter({} as React.MouseEvent<HTMLDivElement>);
      });
      expect(result.current.state.isHovered).toBe(true);

      act(() => {
        result.current.handlers.onMouseLeave({} as React.MouseEvent<HTMLDivElement>);
      });
      expect(result.current.state.isHovered).toBe(false);
    });

    it('sets isPressed to true on mouse down', () => {
      const { result } = renderHook(() => useInteractive({ enabled: true }));
      
      act(() => {
        result.current.handlers.onMouseDown({} as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.state.isPressed).toBe(true);
    });

    it('sets isPressed to false on mouse up', () => {
      const { result } = renderHook(() => useInteractive({ enabled: true }));
      
      act(() => {
        result.current.handlers.onMouseDown({} as React.MouseEvent<HTMLDivElement>);
      });
      expect(result.current.state.isPressed).toBe(true);

      act(() => {
        result.current.handlers.onMouseUp({} as React.MouseEvent<HTMLDivElement>);
      });
      expect(result.current.state.isPressed).toBe(false);
    });

    it('resets both states on mouse leave', () => {
      const { result } = renderHook(() => useInteractive({ enabled: true }));
      
      act(() => {
        result.current.handlers.onMouseEnter({} as React.MouseEvent<HTMLDivElement>);
        result.current.handlers.onMouseDown({} as React.MouseEvent<HTMLDivElement>);
      });
      expect(result.current.state).toEqual({ isHovered: true, isPressed: true });

      act(() => {
        result.current.handlers.onMouseLeave({} as React.MouseEvent<HTMLDivElement>);
      });
      expect(result.current.state).toEqual({ isHovered: false, isPressed: false });
    });
  });

  describe('when disabled', () => {
    it('does not update state on mouse enter', () => {
      const { result } = renderHook(() => useInteractive({ enabled: false }));
      
      act(() => {
        result.current.handlers.onMouseEnter({} as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.state.isHovered).toBe(false);
    });

    it('does not update state on mouse down', () => {
      const { result } = renderHook(() => useInteractive({ enabled: false }));
      
      act(() => {
        result.current.handlers.onMouseDown({} as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.state.isPressed).toBe(false);
    });
  });

  describe('custom event handlers', () => {
    it('calls custom onMouseEnter handler', () => {
      const customHandler = vi.fn();
      const { result } = renderHook(() =>
        useInteractive({ enabled: true, onMouseEnter: customHandler })
      );
      
      const mockEvent = {} as React.MouseEvent<HTMLDivElement>;
      act(() => {
        result.current.handlers.onMouseEnter(mockEvent);
      });

      expect(customHandler).toHaveBeenCalledWith(mockEvent);
      expect(customHandler).toHaveBeenCalledTimes(1);
    });

    it('calls custom onMouseLeave handler', () => {
      const customHandler = vi.fn();
      const { result } = renderHook(() =>
        useInteractive({ enabled: true, onMouseLeave: customHandler })
      );
      
      const mockEvent = {} as React.MouseEvent<HTMLDivElement>;
      act(() => {
        result.current.handlers.onMouseLeave(mockEvent);
      });

      expect(customHandler).toHaveBeenCalledWith(mockEvent);
    });

    it('calls custom onMouseDown handler', () => {
      const customHandler = vi.fn();
      const { result } = renderHook(() =>
        useInteractive({ enabled: true, onMouseDown: customHandler })
      );
      
      const mockEvent = {} as React.MouseEvent<HTMLDivElement>;
      act(() => {
        result.current.handlers.onMouseDown(mockEvent);
      });

      expect(customHandler).toHaveBeenCalledWith(mockEvent);
    });

    it('calls custom onMouseUp handler', () => {
      const customHandler = vi.fn();
      const { result } = renderHook(() =>
        useInteractive({ enabled: true, onMouseUp: customHandler })
      );
      
      const mockEvent = {} as React.MouseEvent<HTMLDivElement>;
      act(() => {
        result.current.handlers.onMouseUp(mockEvent);
      });

      expect(customHandler).toHaveBeenCalledWith(mockEvent);
    });

    it('calls custom handlers even when disabled', () => {
      const customHandler = vi.fn();
      const { result } = renderHook(() =>
        useInteractive({ enabled: false, onMouseEnter: customHandler })
      );
      
      const mockEvent = {} as React.MouseEvent<HTMLDivElement>;
      act(() => {
        result.current.handlers.onMouseEnter(mockEvent);
      });

      expect(customHandler).toHaveBeenCalledWith(mockEvent);
      expect(result.current.state.isHovered).toBe(false);
    });
  });

  describe('default disabled state', () => {
    it('defaults to disabled when no options provided', () => {
      const { result } = renderHook(() => useInteractive());
      
      act(() => {
        result.current.handlers.onMouseEnter({} as React.MouseEvent<HTMLDivElement>);
      });

      expect(result.current.state.isHovered).toBe(false);
    });
  });
});
