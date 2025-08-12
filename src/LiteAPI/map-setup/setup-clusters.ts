import { type MapOptions } from '../../types/index.js'

export const setupClusters = (map: mapboxgl.Map, options: MapOptions) => {
  if (!options.clusters) return

  const { clusters } = options

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'hotels',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        typeof clusters !== 'boolean' && clusters.colors?.[0] ? clusters.colors?.[0] : '#51bbd6',
        100,
        typeof clusters !== 'boolean' && clusters.colors?.[1] ? clusters.colors?.[1] : '#f1f075',
        750,
        typeof clusters !== 'boolean' && clusters.colors?.[2] ? clusters.colors?.[2] : '#f28cb1'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40
      ],
      'circle-emissive-strength': 1
    }
  })

  map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'hotels',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
  });
}