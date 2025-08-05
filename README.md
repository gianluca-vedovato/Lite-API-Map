# Lite API

A lightweight JavaScript library for creating interactive hotel maps with Mapbox integration. Easily display hotels on a map with filtering capabilities and beautiful UI.

## Installation

```bash
npm install lite-api
```

## Usage

### Basic Setup

```javascript
import LiteAPI from 'lite-api';

// Initialize the map
const map = await LiteAPI.Map.init('#map-container', {
  liteApiApiKey: 'your-api-key',
  placeId: 'your-place-id',
  language: 'EN',
  currency: 'EUR'
});
```

### Advanced Configuration

```javascript
const map = await LiteAPI.Map.init('#map-container', {
  liteApiApiKey: 'your-api-key',
  placeId: 'your-place-id',
  language: 'EN',
  currency: 'EUR',
  markerColor: '#ff6b6b',
  clusters: {
    maxZoom: 14,
    radius: 50,
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1']
  }
});
```

### Filtering Hotels

```javascript
// Filter hotels by date and guests
await map.filter({
  checkin: '2024-01-15',
  checkout: '2024-01-20',
  adults: 2,
  children: [8, 12],
  minRating: 4
});
```

## API Reference

### MapOptions

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `liteApiApiKey` | string | Yes | Your Lite API key |
| `placeId` | string | Yes | The place ID to display hotels for |
| `language` | 'EN' \| 'IT' | No | Language for hotel data (default: 'EN') |
| `currency` | 'EUR' \| 'USD' | No | Currency for rates (default: 'EUR') |
| `markerColor` | string | No | Custom color for map markers |
| `clusters` | boolean \| object | No | Enable/configure marker clustering |

### FilterOptions

| Property | Type | Description |
|----------|------|-------------|
| `checkin` | string | Check-in date (YYYY-MM-DD) |
| `checkout` | string | Check-out date (YYYY-MM-DD) |
| `adults` | number | Number of adult guests |
| `children` | number[] | Ages of child guests |
| `currency` | string | Currency for filtering |
| `language` | string | Language for filtering |
| `minRating` | number | Minimum hotel rating |

## Requirements

- Mapbox GL JS (automatically included as a peer dependency)
- A valid Lite API key
- A place ID for the location you want to display

## Browser Support

This library works in all modern browsers that support ES6 modules and the Mapbox GL JS library.

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 