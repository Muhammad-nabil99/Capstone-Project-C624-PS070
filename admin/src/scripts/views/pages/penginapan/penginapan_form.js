import { addPenginapan } from '../../../backend/penginapan/penginapan_handler.js';
import { setupMap } from '../../../utils/maps/map_initialization.js';
import penginapan_validator from '../../../utils/form_handling/penginapan_validator.js';
import { showNotification } from '../../../utils/form_handling/form_notification.js';

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

const Penginapan_form = {
  async render() {
    return `
      <form id="penginapanForm" class="penginapan-form">
        <div class="form-group">
          <label for="name">Nama Penginapan:</label>
          <input type="text" id="name" name="name">
          <div id="nameValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="detail">Detail:</label>
          <textarea id="detail" name="detail" rows="3"></textarea>
          <div id="detailValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="location">Lokasi:</label>
          <input type="text" id="location" name="location">
          <div id="locationValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="fasilitas">Fasilitas:</label>
          <textarea id="fasilitas" name="fasilitas"></textarea>
          <div id="fasilitasValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="price">Harga:</label>
          <input type="text" id="price" name="price">
          <div id="priceValidation" class="validation-message"></div>
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
          <label for="mapLocation">Lokasi Peta:</label>
          <input type="text" id="mapLocation" name="mapLocation" readonly>
          <div id="mapLocationValidation" class="validation-message"></div>
          <div id="map" class="map-container"></div>
        </div>
        <button type="submit">Submit</button>
        <div id="loadingSpinner" class="loading-spinner" style="display: none;">Loading...</div>
        <div id="notification" class="notification"></div>
      </form>
    `;
  },

  async afterRender() {
    const penginapanForm = document.getElementById('penginapanForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = penginapanForm.querySelector('button[type="submit"]');

    const defaultCoordinates = [0, 0];
    const { map, marker } = setupMap(defaultCoordinates);


    penginapan_validator.setupImageInput(imageInput, imagePreview, imageLabel);

    const formFields = ['name', 'detail', 'location', 'fasilitas', 'price', 'mapLocation', 'image'];
    
    formFields.forEach(field => {
      const input = document.getElementById(field);
      if (input) {
        input.addEventListener('blur', () => {
          penginapan_validator.validateSingleField(input);
        });
      }
    });

    penginapanForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(penginapanForm);
      const validationMessages = document.querySelectorAll('.validation-message');

      validationMessages.forEach((message) => {
        message.textContent = '';
      });

      const { isValid, firstInvalidField } = penginapan_validator.validateForm(formData);

      if (!isValid) {
        if (firstInvalidField) {
          firstInvalidField.scrollIntoView({ behavior: 'smooth' });
          firstInvalidField.focus();
        }
        return;
      }

      try {
        loadingSpinner.style.display = 'block';
        submitButton.disabled = true;

        const id = await addPenginapan(
          formData.get('name'),
          formData.get('detail'),
          formData.get('location'),
          formData.get('fasilitas'),
          formData.get('price'),
          formData.get('mapLocation'),
          formData.get('image')
        );

        console.log('Data Penginapan ditambahkan dengan ID:', id);
        showNotification('Data Penginapan berhasil ditambahkan');
        penginapanForm.reset();
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        imageLabel.textContent = 'Pilih file';
        if (marker) {
          marker.remove();
        }
      } catch (error) {
        console.error('Error menambah data Penginapan:', error);
        showNotification('Gagal menambah data Penginapan. Coba kembali.', true);
      } finally {
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
      }
    });
  }
};

export default Penginapan_form;
