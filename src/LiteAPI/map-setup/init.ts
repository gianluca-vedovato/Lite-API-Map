import mapboxgl from 'mapbox-gl'

export const initMap = (container: HTMLElement): mapboxgl.Map => {
  return new mapboxgl.Map({
    container, 
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: 9,
  });
}