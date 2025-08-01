import { throwError } from "../utils/throw-error"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type MapOptions = {
  liteApiApiKey: string,
  placeId: string
}
  
export const Map = {
  init: async (selector: string | HTMLElement, { liteApiApiKey, placeId }: MapOptions) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWNpbGl2ZSIsImEiOiJjbWRybjF0bnkwaTRqMmlzYTBoaHJ3am8yIn0.3N0rJnhEQnxWt3uxSXtsgg';

    const container: HTMLElement | null = typeof selector === 'string' ? document.querySelector(selector) : selector

    if (!container) {
      throwError('Container not found')
      return
    }
    const map = new mapboxgl.Map({
      container, 
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    const response = await fetch('http://0.0.0.0:8000', {
      method: 'POST',
      body: JSON.stringify({
        liteApiApiKey,
        placeId
      })
    })
    const data = await response.json()
    console.log(data)
  }
}