export type LiteAPIMap = {
  map: mapboxgl.Map | null,
  hotels: Hotel[],
  options: MapOptions | null,
  _getHotelsApiParams: null | FilterOptions & {
    liteApiApiKey: string,
    placeId: string,
    placeCoordinates: {
      lng: number,
      lat: number
    },
    language: 'EN' | 'IT',
    currency: 'EUR' | 'USD',
    locality: string
  },
  init: (selector: string | HTMLElement, options: MapOptions) => Promise<LiteAPIMap>,
  filter: (filter: FilterOptions) => Promise<void>,
}

export type Hotel = {
  id: string,
  name: string,
  description: string,
  coordinates: {
    lng: number,
    lat: number
  },
  rate: number,
  locality: string,
  placeId: string,
  address: string,
  image: string,
  rating: number,
}

export type MapOptions = {
  liteApiApiKey: string,
  placeId: string,
  language?: 'IT' | 'EN',
  currency?: 'EUR' | 'USD',
  markerColor?: string,
  clusters?: boolean | { maxZoom?: number, radius?: number, colors?: string[] }
}

export type FilterOptions = {
  checkin?: string,
  checkout?: string,
  adults?: number,
  children?: number[],
  currency?: string,
  language?: string,
  minRating?: number,
}