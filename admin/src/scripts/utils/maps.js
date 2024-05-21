const mapSetup = {
  initializeMap(mapboxgl, mapContainer, defaultCoordinates) {
    return new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: defaultCoordinates,
      zoom: 12
    });
  },

  addMarkerToMap(map, markerCoordinates, mapLocationInput, marker) {
    if (marker) {
      marker.setLngLat(markerCoordinates);
    } else {
      marker = new mapboxgl.Marker()
        .setLngLat(markerCoordinates)
        .addTo(map);
    }
    mapLocationInput.value = `${markerCoordinates[1]},${markerCoordinates[0]}`;
    return marker;
  }
};

module.exports = mapSetup;
