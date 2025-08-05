import { throwError } from '../src/utils/throw-error';
import { generateWhitelabelUrl } from '../src/utils/generate-whitelabel-url';

describe('Utils', () => {
  describe('throwError', () => {
    it('should throw an error with the given message', () => {
      const errorMessage = 'Test error message';
      
      expect(() => {
        throwError(errorMessage);
      }).toThrow(errorMessage);
    });

    it('should throw different error messages', () => {
      const message1 = 'First error';
      const message2 = 'Second error';
      
      expect(() => {
        throwError(message1);
      }).toThrow(message1);
      
      expect(() => {
        throwError(message2);
      }).toThrow(message2);
    });
  });

  describe('generateWhitelabelUrl', () => {
    const mockHotel = {
      id: 'test-hotel-1',
      name: 'Test Hotel',
      description: 'A test hotel',
      coordinates: { lng: 10, lat: 20 },
      rate: 100,
      locality: 'Test City',
      placeId: 'test-place',
      address: '123 Test St',
      image: 'test-image.jpg',
      rating: 4.5,
    };

    it('should generate URL with default options', () => {
      const result = generateWhitelabelUrl(mockHotel);

      expect(result).toContain('https://whitelabel.nuitee.link/hotels/test-hotel-1');
      expect(result).toContain('placeId=test-place');
      expect(result).toContain('language=en');
      expect(result).toContain('currency=EUR');
    });

    it('should generate URL with custom options', () => {
      const result = generateWhitelabelUrl(mockHotel, {
        language: 'IT',
        currency: 'USD',
      });

      expect(result).toContain('language=it');
      expect(result).toContain('currency=USD');
    });

    it('should include required parameters', () => {
      const result = generateWhitelabelUrl(mockHotel);

      expect(result).toContain('checkin=');
      expect(result).toContain('checkout=');
      expect(result).toContain('rooms=1');
      expect(result).toContain('adults=2');
      expect(result).toContain('children=');
    });
  });
}); 