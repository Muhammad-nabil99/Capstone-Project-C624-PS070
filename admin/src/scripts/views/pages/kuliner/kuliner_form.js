import { addKuliner } from '../../../backend/kuliner/kuliner_handler.js';
import { setupMap } from '../../../utils/maps/map_initialization.js';
import kuliner_validator from '../../../utils/form_handling/kuliner_validator.js';
import { showNotification } from '../../../utils/form_handling/form_notification.js';

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

const Kuliner_form = {
  async render() {
    return `
      <form id="kulinerForm" class="kuliner-form">
        <div class="form-group">
          <label for="name">Nama Tempat Kuliner:</label>
          <input type="text" id="name" name="name">
          <div id="nameValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="location">Lokasi:</label>
          <input type="text" id="location" name="location">
          <div id="locationValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="openTime">Jam Buka:</label>
          <input type="text" id="openTime" name="openTime">
          <div id="openTimeValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="detail">Informasi Detail:</label>
          <textarea id="detail" name="detail" rows="3"></textarea>
          <div id="detailValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label>Image:</label>
          <div style="width:max-content">
            <label for="image" id="imageLabel" class="button-like">Choose file</label>
            <input type="file" id="image" name="image" accept="image/*" style="display: none;">
            <div id="imageValidation" class="validation-message"></div>
          </div>
          <div id="imagePreviewContainer">
            <img id="imagePreview" src="" alt="Image Preview" style="display: none;">
          </div>
        </div>
        <div class="form-group">
          <label for="placeName">Nama Tempat:</label>
          <div id="geocoder" class="custom-geocoder"></div>
        </div>
        <div class="form-group">
          <label for="mapLocation">Koordinat Lokasi:</label>
          <input type="text" id="mapLocation" name="mapLocation" readonly>
          <div id="mapLocationValidation" class="validation-message"></div>
          <div id="map" class="map-container"></div>
        </div>
        <button type="submit" class="submit-button">Submit</button>
        <div id="loadingSpinner" class="loading-spinner" style="display: none;">Loading...</div>
        <div id="notification" class="notification"></div>
      </form>
    `;
  },

  async afterRender() {
    const kulinerForm = document.getElementById('kulinerForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = kulinerForm.querySelector('button[type="submit"]');

    const defaultCoordinates = [0, 0];
    const { marker } = setupMap(defaultCoordinates);

    kuliner_validator.setupImageInput(imageInput, imagePreview, imageLabel);

    const formFields = ['name', 'location', 'openTime', 'detail', 'mapLocation', 'image'];
    
    formFields.forEach(field => {
      const input = document.getElementById(field);
      if (input) {
        input.addEventListener('blur', () => {
          kuliner_validator.validateSingleField(input);
        });
      }
    });

    kulinerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(kulinerForm);
      const validationMessages = document.querySelectorAll('.validation-message');

      validationMessages.forEach((message) => {
        message.textContent = '';
      });

      const isValid = kuliner_validator.validateForm(formData);

      if (!isValid) {
        return;
      }

      try {
        loadingSpinner.style.display = 'block';
        submitButton.disabled = true;

        const id = await addKuliner(
          formData.get('name'),
          formData.get('location'),
          formData.get('openTime'),
          formData.get('detail'),
          formData.get('mapLocation'),
          formData.get('image')
        );

        console.log('Data Kuliner ditambah dengan ID:', id);
        showNotification('Data Kuliner berhasil ditambah!');
        kulinerForm.reset();
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        imageLabel.textContent = 'Pilih file';
        if (marker) {
          marker.remove();
        }
      } catch (error) {
        console.error('Error menambah data Kuliner:', error);
        showNotification('Gagal menambah data Kuliner. Coba kembali.', true);
      } finally {
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
      }
    });
  }
};

export default Kuliner_form;
