import { getKulinerById, updateKuliner } from '../../../backend/kuliner/kuliner_handler.js';
import { setupMap } from '../../../utils/maps/map_initialization.js';
import kuliner_validator from '../../../utils/form_handling/kuliner_validator.js';
import { showNotification } from '../../../utils/form_handling/form_notification.js';

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Kuliner_form_edit = {
  async render() {
    return `
      <div id="notification" class="notification"></div>
      <form id="kulinerForm" class="kuliner-form">
        <div class="form-group">
          <label for="name">Nama Tempat Kuliner:</label>
          <input type="text" id="name" name="name" >
          <div class="validation-message" id="nameValidation"></div>
        </div>
        <div class="form-group">
          <label for="location">Lokasi:</label>
          <input type="text" id="location" name="location" >
          <div class="validation-message" id="locationValidation"></div>
        </div>
        <div class="form-group">
          <label for="openTime">Jam Buka:</label>
          <input type="text" id="openTime" name="openTime" >
          <div class="validation-message" id="openTimeValidation"></div>
        </div>
        <div class="form-group">
          <label for="detail">Informasi Detail:</label>
          <textarea id="detail" name="detail" rows="3" ></textarea>
          <div class="validation-message" id="detailValidation"></div>
        </div>
        <div class="form-group">
          <label>Image:</label>
          <div style="width:max-content">
            <label for="image" id="imageLabel" class="button-like">Choose file</label>
            <input type="file" id="image" name="image" accept="image/*" style="display: none;">
          </div>
          <div id="imagePreviewContainer">
            <img id="imagePreview" src="" alt="Image Preview" style="display: none;">
          </div>
          <div class="validation-message" id="imageValidation"></div>
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
        <button type="submit">Update</button>
      </form>
    `;
  },

  async afterRender() {
    const kulinerId = window.location.hash.split('/')[2];
    if (!kulinerId) {
      console.error('Tidak ada ID Kuliner yang ditemukan di URL');
      return;
    }

    const kulinerForm = document.getElementById('kulinerForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    const mapLocationInput = document.getElementById('mapLocation');

    const defaultCoordinates = [106.8456, -6.2088];
    ({ map, marker } = setupMap(defaultCoordinates));

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
      console.error('Error mengambil data Kuliner:', error);
    }

    kuliner_validator.setupImageInput(imageInput, imagePreview, imageLabel);

    kulinerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(kulinerForm);
      if (!kuliner_validator.validateForm(formData)) {
        return;
      }

      const name = formData.get('name').trim();
      const location = formData.get('location').trim();
      const openTime = formData.get('openTime').trim();
      const detail = formData.get('detail').trim();
      const mapLocation = formData.get('mapLocation').trim();
      const image = formData.get('image');

      const updates = {};
      if (name !== initialData.name) updates.name = name;
      if (location !== initialData.location) updates.location = location;
      if (openTime !== initialData.openTime) updates.openTime = openTime;
      if (detail !== initialData.detail) updates.detail = detail;
      if (mapLocation !== initialData.mapLocation) updates.mapLocation = mapLocation;

      try {
        await updateKuliner(kulinerId, updates, image);
        showNotification('Kuliner updated successfully');
        setTimeout(() => {
          window.location.href = '/#/kuliner';
        }, 1500);
      } catch (error) {
        console.error('Error memperbarui data Kuliner:', error);
        showNotification('Gagal memperbarui data Kuliner. Coba kembali.', true);
      }
    });
  }
};

export default Kuliner_form_edit;
