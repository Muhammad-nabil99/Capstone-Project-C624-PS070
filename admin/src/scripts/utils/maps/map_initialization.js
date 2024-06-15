const mapSetup = require('./maps.js');
const { initializeMap, addMarkerToMap } = mapSetup;

export function setupMap(defaultCoordinates) {
  const mapContainer = document.getElementById('map');
  const mapLocationInput = document.getElementById('mapLocation');

  const map = initializeMap(mapboxgl, mapContainer, defaultCoordinates);
  let marker = addMarkerToMap(map, defaultCoordinates, mapLocationInput, null);

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Masukkan nama tempat atau alamat',
    bbox: [95.316, -11.008, 141.056, 6.214],
  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  document.getElementById('geocoder').classList.add('custom-geocoder');

  geocoder.on('result', (e) => {
    const coordinates = e.result.geometry.coordinates;
    mapLocationInput.value = `${coordinates[1]},${coordinates[0]}`;
    map.flyTo({ center: coordinates, zoom: 15 });
    if (marker) {
      marker.setLngLat(coordinates);
    } else {
      marker = addMarkerToMap(map, coordinates, mapLocationInput, marker);
    }
  });

  return { map, marker };
}
