import { type Hotel, type MapOptions } from '../../types/index.js'
import { setupHotelSource } from './setup-hotel-source.js'
import { setupClusters } from './setup-clusters.js'
import { addMapInteractions } from './add-map-interactions.js'

export const updateSource = (map: mapboxgl.Map, hotels: Hotel[], options: MapOptions) => {
  map.removeLayer('hotels')
  map.removeLayer('cluster-count')
  map.removeLayer('clusters')
  map.removeSource('hotels')
  map.removeInteraction('places-mouseenter-interaction')
  map.removeInteraction('places-mouseleave-interaction')
  map.removeInteraction('places-click-interaction')
  map.removeInteraction('click-clusters')
  map.removeInteraction('click-unclustered-point')
  map.removeInteraction('clusters-mouseenter')
  map.removeInteraction('clusters-mouseleave')
  map.removeInteraction('unclustered-mouseenter')
  map.removeInteraction('unclustered-mouseleave')
  setupHotelSource(map, hotels, options)
  setupClusters(map, options)
  addMapInteractions(map, options)
}