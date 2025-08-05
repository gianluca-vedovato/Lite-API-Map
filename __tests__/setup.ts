// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn().mockImplementation(() => ({
    setCenter: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    remove: jest.fn(),
  })),
  accessToken: '',
}));

// Mock CSS import
jest.mock('mapbox-gl/dist/mapbox-gl.css', () => ({}));

// Mock fetch
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}; 