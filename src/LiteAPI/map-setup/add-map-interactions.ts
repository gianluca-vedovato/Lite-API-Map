import type { Hotel, MapOptions } from "../../types/index.js";
import mapboxgl from "mapbox-gl";
import { generateWhitelabelUrl } from "../../utils/generate-whitelabel-url.js";

export const addMapInteractions = (map: mapboxgl.Map, options: MapOptions) => {
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.addInteraction('places-mouseenter-interaction', {
    type: 'mouseenter',
    target: { layerId: 'hotels' },
    handler: (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const geometry = e.feature?.geometry;
      const coordinates = geometry?.type === 'Point' ? geometry.coordinates.slice() : undefined;
      const hotel = e.feature?.properties;
      const rating = typeof hotel?.rating === 'number' ? Math.max(0, Math.min(10, hotel.rating)) : 0;
      const filledStars = Math.floor(rating / 2); // Convert 0-10 scale to 0-5 stars
      const stars = '★'.repeat(filledStars) + '☆'.repeat(5 - filledStars);
      
      const description = `
        <div style="min-width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; overflow: hidden;">
          ${hotel?.image ? `<img src="${hotel.image}" alt="${hotel?.name || 'Hotel'}" style="width: 88%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">` : ''}
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${hotel?.name || 'Hotel'}</h3>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="color: #ffd700; font-size: 14px; margin-right: 4px;">${stars}</span>
            <span style="color: #666; font-size: 12px;">${rating}/10</span>
          </div>
          <p style="margin: 0; color: #333; font-size: 14px;">Rooms starting from <strong>${hotel?.rate} ${options.currency || 'EUR'}</strong></p>
        </div>
      `;
      if (coordinates) {
        popup.setLngLat([coordinates[0], coordinates[1]]).setHTML(description as string).addTo(map);
      }
    }
  });

  map.addInteraction('places-mouseleave-interaction', {
    type: 'mouseleave',
    target: { layerId: 'hotels' },
    handler: () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    }
  });

  map.addInteraction('places-click-interaction', {
    type: 'click',
    target: { layerId: 'hotels' },
    handler: (e) => {
      if (!e.feature) return;

      const hotel = e.feature.properties as unknown as Hotel;
      const url = generateWhitelabelUrl(hotel, {
        language: options.language || 'EN',
        currency: options.currency || 'EUR'
      });

      window.open(url, '_blank');
    }
  });
  
  if (options.clusters) {
    map.addInteraction('click-clusters', {
      type: 'click',
      target: { layerId: 'clusters' },
      handler: (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        
        if (features.length === 0 || !features[0]?.properties?.cluster_id) return;
        
        const clusterId = features[0].properties.cluster_id;
        const source = map.getSource('hotels') as mapboxgl.GeoJSONSource;
        
        if (!source || typeof source.getClusterExpansionZoom !== 'function') return;
        
        source.getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err || !zoom) return;

            const geometry = features[0]?.geometry;
            if (!geometry || geometry.type !== 'Point') return;
            const pointGeometry = geometry as { type: 'Point'; coordinates: number[] };
            if (!pointGeometry.coordinates || !Array.isArray(pointGeometry.coordinates) || pointGeometry.coordinates.length < 2) return;
            const coordinates = pointGeometry.coordinates;

            map.easeTo({
              center: coordinates as [number, number],
              zoom: zoom
            });
          }
        );
      }
    });

    map.addInteraction('click-unclustered-point', {
      type: 'click',
      target: { layerId: 'unclustered-point' },
      handler: (e) => {
        if (!e.feature?.geometry || !e.feature?.properties) return;
        
        const geometry = e.feature.geometry;
        if (geometry.type !== 'Point') return;
        const pointGeometry = geometry as { type: 'Point'; coordinates: number[] };
        const coordinates = pointGeometry.coordinates.slice();
        const mag = e.feature.properties.mag;
        const tsunami = e.feature.properties.tsunami === 1 ? 'yes' : 'no';

        new mapboxgl.Popup()
          .setLngLat(coordinates as [number, number])
          .setHTML(
            `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
          )
          .addTo(map);
      }
    });

    map.addInteraction('clusters-mouseenter', {
      type: 'mouseenter',
      target: { layerId: 'clusters' },
      handler: () => {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    map.addInteraction('clusters-mouseleave', {
      type: 'mouseleave',
      target: { layerId: 'clusters' },
      handler: () => {
        map.getCanvas().style.cursor = '';
      }
    });

    // Change the cursor to a pointer when the mouse is over an individual POI.
    map.addInteraction('unclustered-mouseenter', {
      type: 'mouseenter',
      target: { layerId: 'unclustered-point' },
      handler: () => {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    // Change the cursor back to a pointer when it stops hovering over an individual POI.
    map.addInteraction('unclustered-mouseleave', {
      type: 'mouseleave',
      target: { layerId: 'unclustered-point' },
      handler: () => {
        map.getCanvas().style.cursor = '';
      }
    });
  }
};