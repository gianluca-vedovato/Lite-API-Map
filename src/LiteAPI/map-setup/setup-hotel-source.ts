import { type Hotel, type MapOptions } from '../../types'

export const setupHotelSource = (map: mapboxgl.Map, hotels: Hotel[], options: MapOptions) => {
  const addSourceOptions: mapboxgl.GeoJSONSourceSpecification = {
    type: 'geojson',
    generateId: true,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
    data: {
      type: 'FeatureCollection',
      features: hotels.map((hotel: any) => ({
        type: 'Feature',
        properties: {
          ...hotel
        },
        geometry: {
          type: 'Point',
          coordinates: [hotel.coordinates.lng, hotel.coordinates.lat]
        }
      }))
    }
  }

  const existingSource = map.getSource('hotels')
  if (existingSource) {
    (existingSource as mapboxgl.GeoJSONSource).setData(addSourceOptions.data!)
  } else {
    map.addSource('hotels', addSourceOptions)
    map.addLayer({
      'id': 'hotels',
      'source': 'hotels',
      'type': 'circle',
      'paint': {
        'circle-color': options.markerColor || '#4264fb',
        'circle-radius': 10,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });
  }

}