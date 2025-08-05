import { LiteAPI } from '../src/LiteAPI/main';

describe('LiteAPI', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Map', () => {
    it('should be defined', () => {
      expect(LiteAPI.Map).toBeDefined();
    });

    it('should have required properties', () => {
      expect(LiteAPI.Map).toHaveProperty('map');
      expect(LiteAPI.Map).toHaveProperty('hotels');
      expect(LiteAPI.Map).toHaveProperty('options');
      expect(LiteAPI.Map).toHaveProperty('init');
      expect(LiteAPI.Map).toHaveProperty('filter');
    });

    it('should initialize with null values', () => {
      expect(LiteAPI.Map.map).toBeNull();
      expect(LiteAPI.Map.hotels).toEqual([]);
      expect(LiteAPI.Map.options).toBeNull();
      expect(LiteAPI.Map._getHotelsApiParams).toBeNull();
    });
  });
}); 