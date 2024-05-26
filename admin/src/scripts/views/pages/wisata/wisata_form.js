import { addWisata } from '../../../backend/wisata/wisata_handler.js';
import mapSetup from '../../../utils/maps.js';

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Wisata_form = {
  async render() {
    return `
      <form id="wisataForm">
        <div class="form-group">
          <label for="name">Nama Tempat Wisata:</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="location">Lokasi:</label>
          <input type="text" id="location" name="location" required>
        </div>
        <div class="form-group">
          <label for="openTime">Open Time:</label>
          <input type="text" id="openTime" name="openTime" required>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" required>
        </div>
        <div class="form-group">
          <label for="detail">Detail:</label>
          <input type="text" id="detail" name="detail" required>
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" name="image" required>
        </div>
        <div class="form-group">
          <label for="placeName">Place Name:</label>
          <div id="geocoder" class="custom-geocoder"></div>
        </div>
        <div class="form-group">
          <label for="mapLocation">Map Location:</label>
          <input type="text" id="mapLocation" name="mapLocation" readonly>
          <div id="map"></div>
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  },

  async afterRender() {
    const mapContainer = document.getElementById('map');
    const mapLocationInput = document.getElementById('mapLocation');
    const wisataForm = document.getElementById('wisataForm');

    const defaultCoordinates = [106.8456, -6.2088];
    map = initializeMap(mapboxgl, mapContainer, defaultCoordinates);
    marker = addMarkerToMap(map, defaultCoordinates, mapLocationInput, marker);


    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Enter place name or address',
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

    wisataForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const location = document.getElementById('location').value;
      const openTime = document.getElementById('openTime').value;
      const price = document.getElementById('price').value;
      const detail = document.getElementById('detail').value;
      const mapLocation = document.getElementById('mapLocation').value;
      const image = document.getElementById('image').files[0];

      try {
        const id = await addWisata(name, location, openTime, price, detail, mapLocation, image);
        console.log('Wisata added with ID:', id);

        wisataForm.reset();
      } catch (error) {
        console.error('Error adding Wisata:', error);
        alert('Failed to add Wisata. Please try again.');
      }
    });
  }
};

export default Wisata_form;