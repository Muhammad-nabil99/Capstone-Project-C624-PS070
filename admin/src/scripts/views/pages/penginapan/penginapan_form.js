import { addPenginapan } from '../../../backend/penginapan/penginapan_handler.js';
import mapSetup from '../../../utils/maps.js';
import { showNotification } from '../../../utils/form_notification.js';

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'your-mapbox-access-token';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Penginapan_form = {
  async render() {
    return `
      <form id="penginapanForm" class="penginapan-form">
        <div class="form-group">
          <label for="name">Nama Penginapan:</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="detail">Detail:</label>
          <textarea id="detail" name="detail" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="location">Lokasi:</label>
          <input type="text" id="location" name="location" required>
        </div>
        <div class="form-group">
          <label for="fasilitas">Fasilitas:</label>
          <textarea id="fasilitas" name="fasilitas" required></textarea>
        </div>
        <div class="form-group">
          <label for="price">Harga:</label>
          <input type="text" id="price" name="price" required>
        </div>
        <div class="form-group">
          <label for="image">Gambar:</label>
          <input type="file" id="image" name="image" accept="image/*" required>
          <div id="imagePreviewContainer">
            <img id="imagePreview" src="" alt="Image Preview" style="display: none;">
            <button id="switchImageButton" type="button" style="display: none;">Ganti Gambar</button>
          </div>
        </div>
        <div class="form-group">
          <label for="placeName">Nama Tempat:</label>
          <div id="geocoder" class="custom-geocoder"></div>
        </div>
        <div class="form-group">
          <label for="mapLocation">Lokasi Peta:</label>
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
    const penginapanForm = document.getElementById('penginapanForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const switchImageButton = document.getElementById('switchImageButton');
    
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
          switchImageButton.style.display = 'block';
          imageInput.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });

    switchImageButton.addEventListener('click', () => {
      imagePreview.src = '';
      imagePreview.style.display = 'none';
      switchImageButton.style.display = 'none';
      imageInput.style.display = 'block';
      imageInput.value = '';
    });

    penginapanForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(penginapanForm);
      const image = formData.get('image');

      try {
        const id = await addPenginapan(
          formData.get('name'),
          formData.get('detail'),
          formData.get('location'),
          formData.get('fasilitas'),
          formData.get('price'),
          formData.get('mapLocation'),
          image
        );

        console.log('Penginapan added with ID:', id);
        showNotification('Penginapan added successfully!');
        penginapanForm.reset();
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        imageInput.style.display = 'block';
        marker.remove();
      } catch (error) {
        console.error('Error adding Penginapan:', error);
        showNotification('Failed to add Penginapan. Please try again.', true);
      }
    });
  }
};

export default Penginapan_form;
