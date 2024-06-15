const mapSetup = require('./maps.js');

const geocodeHelper = {
  async geocodePlace(placeName, mapboxgl, map, mapLocationInput, marker) {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();

      if (data.features.length > 0) {
        const coordinates = data.features[0].center;
        mapLocationInput.value = `${coordinates[1]},${coordinates[0]}`;
        if (map) {
          map.flyTo({ center: coordinates, zoom: 15 });
          if (marker) {
            marker.setLngLat(coordinates);
          } else {
            marker = mapSetup.addMarkerToMap(map, coordinates, mapLocationInput, marker);
          }
        } else {
          const mapContainer = document.getElementById('map');
          mapContainer.style.display = 'block';
          map = mapSetup.initializeMap(mapboxgl, 'map', coordinates);
          marker = mapSetup.addMarkerToMap(map, coordinates, mapLocationInput, marker);
        }
      } else {
        alert('Lokasi tidak ditemukan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi error saat mengambil lokasi.');
    }
  }
};

module.exports = geocodeHelper;
