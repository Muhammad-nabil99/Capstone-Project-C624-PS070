import { addWisata } from '../../../backend/wisata/wisata_handler.js';
import mapSetup from '../../../utils/maps.js';
import { showNotification } from '../../../utils/form_notification.js';

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Wisata_form = {
  async render() {
    return `
      <form id="wisataForm" class="wisata-form">
        <div class="form-group">
          <label for="name">Nama Tempat Wisata:</label>
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
          <label for="price">Harga Tiket:</label>
          <input type="text" id="price" name="price" required>
        </div>
        <div class="form-group">
          <label for="detail">Informasi Detail:</label>
          <textarea id="detail" name="detail" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label>Image:</label>
          <div style="width:max-content">
            <label for="image" id="imageLabel" class="button-like">Choose file</label>
            <input type="file" id="image" name="image" accept="image/*" required style="display: none;">
          </div>
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
    const mapContainer = document.getElementById('map');
    const mapLocationInput = document.getElementById('mapLocation');
    const wisataForm = document.getElementById('wisataForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    
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

    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imagePreview.src = event.target.result;
          imagePreview.style.display = 'block';
          imageLabel.textContent = 'Switch image';
        };
        reader.readAsDataURL(file);
      }
    });

    imageLabel.addEventListener('click', (e) => {
      e.preventDefault();
      imageInput.click();
    });

    imageInput.addEventListener('click', () => {
      imageInput.value = '';
    });

    wisataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(wisataForm);
      const image = formData.get('image');

      try {
        const id = await addWisata(
          formData.get('name'),
          formData.get('location'),
          formData.get('openTime'),
          formData.get('price'),
          formData.get('detail'),
          formData.get('mapLocation'),
          image
        );

        console.log('Wisata added with ID:', id);
        showNotification('Wisata added successfully!');
        wisataForm.reset();
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        imageLabel.textContent = 'Choose file';
        marker.remove();
      } catch (error) {
        console.error('Error adding Wisata:', error);
        showNotification('Failed to add Wisata. Please try again.', true);
      }
    });
  }
};

export default Wisata_form;
