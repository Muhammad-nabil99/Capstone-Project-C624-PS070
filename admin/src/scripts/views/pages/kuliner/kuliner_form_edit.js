import { getKulinerById, updateKuliner } from '../../../backend/kuliner/kuliner_handler.js';
import mapSetup from '../../../utils/maps.js';

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Kuliner_form_edit = {
  async render() {
    return `
      <form id="kulinerForm" class="kuliner-form">
        <div class="form-group">
          <label for="name">Nama Tempat Kuliner:</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="location">Lokasi:</label>
          <input type="text" id="location" name="location" required>
        </div>
        <div class="form-group">
          <label for="openTime">Jam Buka:</label>
          <input type="text" id="openTime" name="openTime" required>
        </div>
        <div class="form-group">
          <label for="detail">Informasi Detail:</label>
          <textarea id="detail" name="detail" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" name="image" accept="image/*">
          <div id="imagePreviewContainer">
            <img id="imagePreview" src="" alt="Image Preview" style="display: none;">
          </div>
        </div>
        <div class="form-group">
          <label for="placeName">Place Name:</label>
          <div id="geocoder" class="custom-geocoder"></div>
        </div>
        <div class="form-group">
          <label for="mapLocation">Map Location:</label>
          <input type="text" id="mapLocation" name="mapLocation" readonly>
          <div id="map" class="map-container"></div>
        </div>
        <button type="submit">Submit</button>
        <div id="notification" class="notification"></div>
      </form>
    `;
  },

  async afterRender() {
    const kulinerId = window.location.hash.split('/')[2];
    if (!kulinerId) {
      console.error('No Kuliner ID found in URL');
      return;
    }

    const mapContainer = document.getElementById('map');
    const mapLocationInput = document.getElementById('mapLocation');
    const kulinerForm = document.getElementById('kulinerForm');
    const imagePreview = document.getElementById('imagePreview');
    const imageInput = document.getElementById('image');

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

    let initialData;
    try {
      const kuliner = await getKulinerById(kulinerId);
      initialData = kuliner;
      document.getElementById('name').value = kuliner.name;
      document.getElementById('location').value = kuliner.location;
      document.getElementById('openTime').value = kuliner.openTime;
      document.getElementById('detail').value = kuliner.detail;
      document.getElementById('mapLocation').value = kuliner.mapLocation;

      if (kuliner.imageUrl) {
        imagePreview.src = kuliner.imageUrl;
        imagePreview.style.display = 'block';
      }

      const existingCoordinates = kuliner.mapLocation.split(',').map(Number).reverse();
      map.flyTo({ center: existingCoordinates, zoom: 15 });
      if (marker) {
        marker.setLngLat(existingCoordinates);
      } else {
        marker = addMarkerToMap(map, existingCoordinates, mapLocationInput, marker);
      }
    } catch (error) {
      console.error('Error fetching Kuliner data:', error);
    }
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    kulinerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const location = document.getElementById('location').value;
      const openTime = document.getElementById('openTime').value;
      const detail = document.getElementById('detail').value;
      const mapLocation = document.getElementById('mapLocation').value;
      const image = document.getElementById('image').files[0];

      const updates = {};
      if (name !== initialData.name) updates.name = name;
      if (location !== initialData.location) updates.location = location;
      if (openTime !== initialData.openTime) updates.openTime = openTime;
      if (detail !== initialData.detail) updates.detail = detail;
      if (mapLocation !== initialData.mapLocation) updates.mapLocation = mapLocation;

      if (image && !['image/png', 'image/jpeg', 'image/jpg'].includes(image.type)) {
        alert('Only PNG, JPEG, and JPG images are allowed');
        return;
      }

      try {
        await updateKuliner(kulinerId, updates, image);
        console.log('Kuliner updated with ID:', kulinerId);
        alert('Kuliner updated successfully');
        window.location.href = '/#/kuliner';
      } catch (error) {
        console.error('Error updating Kuliner:', error);
        alert('Failed to update Kuliner. Please try again.');
      }
    });
  }
};

export default Kuliner_form_edit;
