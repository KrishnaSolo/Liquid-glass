import '@testing-library/jest-dom';

// Mock matchMedia for color scheme detection tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('dark') ? false : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Mock CSS.supports for feature detection tests
Object.defineProperty(CSS, 'supports', {
  writable: true,
  value: (property: string, _value?: string) => {
    // Simulate backdrop-filter support
    if (property === 'backdrop-filter' || property === '-webkit-backdrop-filter') {
      return true;
    }
    if (property.includes('backdrop-filter')) {
      return true;
    }
    return false;
  },
});
