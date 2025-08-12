import { throwError } from "../utils/throw-error.js"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { initMap } from './map-setup/init.js'
import { type FilterOptions, type LiteAPIMap, type MapOptions } from '../types/index.js'
import { addMapInteractions, setupClusters, setupHotelSource, updateSource } from "./map-setup/index.js"

// Base URL for API calls - empty in dev mode, full URL in production
const baseUrl = import.meta.env.MODE === 'development' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? '' 
  : 'https://glcvdv-lite-api-map.netlify.app'

export const Map: LiteAPIMap = {
  map: null,
  hotels: [],
  options: null,
  _getHotelsApiParams: null,
  init: async (selector: string | HTMLElement, options: MapOptions): Promise<LiteAPIMap> => {
    const { liteApiApiKey, placeId, language, currency } = options
    Map.options = options

    const accessToken = await fetch(`${baseUrl}/api/get-mapbox-access-token`)
    const { accessToken: mapboxAccessToken } = await accessToken.json()
    mapboxgl.accessToken = mapboxAccessToken

    const container: HTMLElement | null = typeof selector === 'string' ? document.querySelector(selector) : selector

    if (!container) {
      throwError('Container not found')
      return Map
    }

    Map.map = initMap(container)

    const place = await fetch(`${baseUrl}/api/get-place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placeId,
        liteApiApiKey,
      })
    })
    const { data: { lng, lat, locality } } = await place.json()

    if (!lng || !lat) {
      console.warn('No place found for ID:', placeId)
      return Map
    }

    Map.map.setCenter([lng, lat])

    Map._getHotelsApiParams = {
      liteApiApiKey,
      placeId,
      placeCoordinates: {
        lng,
        lat
      },
      language: language || 'EN',
      currency: currency || 'EUR',
      locality
    }

    const ratesResponse = await fetch(`${baseUrl}/api/get-hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Map._getHotelsApiParams)
    })

    const { data: { hotels } } = await ratesResponse.json()

    Map.hotels = hotels

    setupHotelSource(Map.map, hotels, options)
    
    setupClusters(Map.map, options)

    addMapInteractions(Map.map, options)

    return Map
  },
  filter: async (filters: FilterOptions) => {
    if (!Map.map || !Map.options) {
      throwError('Map not initialized')
      return
    }

    const ratesResponse = await fetch(`${baseUrl}/api/get-hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...Map._getHotelsApiParams,
        ...filters
      })
    })

    const { data: { hotels } } = await ratesResponse.json()

    Map.hotels = hotels

    updateSource(Map.map, hotels, Map.options)
  }
}