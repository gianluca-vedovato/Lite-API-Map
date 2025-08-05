import { Map } from '../src/LiteAPI/Map';
import { throwError } from '../src/utils/throw-error';

// Mock the utils
jest.mock('../src/utils/throw-error');
jest.mock('../src/LiteAPI/map-setup', () => ({
  initMap: jest.fn().mockReturnValue({}),
  addMapInteractions: jest.fn(),
  setupClusters: jest.fn(),
  setupHotelSource: jest.fn(),
  updateSource: jest.fn(),
}));

describe('Map', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset Map state
    Map.map = null;
    Map.hotels = [];
    Map.options = null;
    Map._getHotelsApiParams = null;
  });

  describe('init', () => {
    const mockOptions = {
      liteApiApiKey: 'test-key',
      placeId: 'test-place',
      language: 'EN' as const,
      currency: 'EUR' as const,
    };

    beforeEach(() => {
      // Mock successful API responses
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ accessToken: 'test-token' }),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({
            data: { lng: 10, lat: 20, locality: 'Test City' }
          }),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({
            data: { hotels: [{ id: '1', name: 'Test Hotel' }] }
          }),
        });
    });

    it('should initialize map successfully', async () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);

      const result = await Map.init('#test-container', mockOptions);

      expect(result).toBe(Map);
      expect(Map.options).toEqual(mockOptions);
      expect(Map.map).toBeDefined();
      expect(Map.hotels).toHaveLength(1);
      expect(Map._getHotelsApiParams).toBeDefined();

      document.body.removeChild(container);
    });

    it('should handle container not found', async () => {
      const result = await Map.init('#non-existent', mockOptions);
      
      // The function should return the Map object even if container is not found
      expect(result).toBe(Map);
      expect(throwError).toHaveBeenCalledWith('Container not found');
    });

    it('should handle missing place coordinates', async () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);

      // Mock API response with no coordinates
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ accessToken: 'test-token' }),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve({
            data: { lng: null, lat: null, locality: 'Test City' }
          }),
        });

      const result = await Map.init('#test-container', mockOptions);

      expect(result).toBe(Map);
      expect(console.warn).toHaveBeenCalledWith('No place found for ID:', 'test-place');

      document.body.removeChild(container);
    });
  });

  describe('filter', () => {
    const mockFilters = {
      checkin: '2024-01-15',
      checkout: '2024-01-20',
      adults: 2,
    };

    beforeEach(() => {
      // Set up Map state as if initialized
      Map.map = {} as any;
      Map.options = { liteApiApiKey: 'test-key', placeId: 'test-place' };
      Map._getHotelsApiParams = {
        liteApiApiKey: 'test-key',
        placeId: 'test-place',
        placeCoordinates: { lng: 10, lat: 20 },
        language: 'EN',
        currency: 'EUR',
        locality: 'Test City',
      };
    });

    it('should handle map not initialized', async () => {
      Map.map = null;
      Map.options = null;

      await Map.filter(mockFilters);
      
      // The function should call throwError but not throw
      expect(throwError).toHaveBeenCalledWith('Map not initialized');
    });

    it('should call throwError when map is not initialized', async () => {
      Map.map = null;
      Map.options = null;

      await Map.filter(mockFilters);
      
      expect(throwError).toHaveBeenCalledWith('Map not initialized');
    });
  });
}); 