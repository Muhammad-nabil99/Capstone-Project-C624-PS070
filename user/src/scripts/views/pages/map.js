const { doc, getDoc } = require('firebase/firestore');
const { db } = require('../../backend/firebase');
const UrlParser = require('../../routes/url-parse');

const MapPage = {
  async render() {
    return `
      <div id="mapContainer" style="width: 100%; height: 400px; position: relative;">
        <div id="loadingSpinner" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <div class="spinner"></div>
        </div>
      </div>
      <div id="transportationModes">
        <button data-mode="driving">Driving</button>
        <button data-mode="walking">Walking</button>
        <button data-mode="cycling">Cycling</button>
      </div>
      <button id="backButton">Back</button>
      <p id="errorMessage" style="color: red;"></p>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { type, id } = url;
    console.log("Type:", type, "ID:", id);

    try {
      const mapLocation = await this._fetchLocation(type, id);
      if (mapLocation) {
        const [lat, lng] = mapLocation.split(',').map(Number);
        this._initializeMap(lat, lng);
        this._getUserLocation(lat, lng);

        document.querySelectorAll('#transportationModes button').forEach(button => {
          button.addEventListener('click', () => {
            const mode = button.getAttribute('data-mode');
            this._getUserLocation(lat, lng, mode);
          });
        });
      }
    } catch (error) {
      console.error('Error:', error);
      this._displayError('Failed to load map location. Please try again.');
    }

    document.getElementById('backButton').addEventListener('click', () => {
      window.history.back();
    });
  },

  async _fetchLocation(type, id) {
    try {
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().mapLocation;
      } else {
        throw new Error('No such document!');
      }
    } catch (error) {
      throw new Error('Error fetching detail data: ' + error.message);
    }
  },

  _initializeMap(lat, lng) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
    this.map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);

    document.getElementById('loadingSpinner').style.display = 'none';
  },

  _getUserLocation(destinationLat, destinationLng, mode = 'driving') {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          console.log(`User Location: ${userLat}, ${userLng}`);
          this._fetchRoute(userLat, userLng, destinationLat, destinationLng, mode);
        },
        (error) => {
          console.error('Error getting user location:', error);
          this._displayError('Geolocation access denied. Unable to show route.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this._displayError('Geolocation is not supported by this browser.');
    }
  },

  async _fetchRoute(userLat, userLng, destinationLat, destinationLng, mode) {
    const validModes = ['driving', 'walking', 'cycling'];
    if (!validModes.includes(mode)) {
      mode = 'driving';
    }

    try {
      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/${mode}/${userLng},${userLat};${destinationLng},${destinationLat}?geometries=geojson&overview=full&steps=true&access_token=${mapboxgl.accessToken}`);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;
        console.log(`Route: ${JSON.stringify(route)}`);
        this._drawRoute(route);
      } else {
        this._displayError('No route found. Please try a different mode of transportation.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      this._displayError('Error fetching route. Please try again.');
    }
  },

  _drawRoute(route) {
    if (this.map.getSource('route')) {
      this.map.getSource('route').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      });
    } else {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 6,
        },
      });
    }

    const bounds = route.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(route[0], route[0]));

    this.map.fitBounds(bounds, { padding: 50 });
  },

  _displayError(message) {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('errorMessage').textContent = message;
  },
};

module.exports = MapPage;
