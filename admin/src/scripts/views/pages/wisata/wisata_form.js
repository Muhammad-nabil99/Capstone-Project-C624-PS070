import { addWisata } from '../../../backend/wisata/wisata_handler.js';
import { setupMap } from '../../../utils/maps/map_initialization.js';
import wisata_validator from '../../../utils/form_handling/wisata_validator.js';
import { showNotification } from '../../../utils/form_handling/form_notification.js';

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

const Wisata_form = {
  async render() {
    return `
      <form id="wisataForm" class="wisata-form">
        <div class="form-group">
          <label for="name">Nama Tempat Wisata:</label>
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
          <label for="price">Harga Tiket:</label>
          <input type="text" id="price" name="price" placeholder="Rp.">
          <div id="priceValidation" class="validation-message"></div>
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
          <label for="placeName">Place Name:</label>
          <div id="geocoder" class="custom-geocoder"></div>
        </div>
        <div class="form-group">
          <label for="mapLocation">Map Location:</label>
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
    const wisataForm = document.getElementById('wisataForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = wisataForm.querySelector('button[type="submit"]');

    const defaultCoordinates = [0, 0];
    const { map, marker } = setupMap(defaultCoordinates);

    wisata_validator.setupImageInput(imageInput, imagePreview, imageLabel);

    const formFields = ['name', 'location', 'openTime', 'price', 'detail', 'mapLocation', 'image'];
    
    formFields.forEach(field => {
      const input = document.getElementById(field);
      if (input) {
        input.addEventListener('blur', () => {
          wisata_validator.validateSingleField(input);
        });
      }
    });

    wisataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(wisataForm);
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

        const id = await addWisata(
          formData.get('name'),
          formData.get('location'),
          formData.get('openTime'),
          formData.get('price'),
          formData.get('detail'),
          formData.get('mapLocation'),
          formData.get('image')
        );

        console.log('Data Wisata ditambah dengan ID:', id);
        showNotification('Data Wisata berhasil ditambahkan!');
        wisataForm.reset();
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        imageLabel.textContent = 'Pilih file';
        if (marker) {
          marker.remove();
        }
      } catch (error) {
        showNotification('Terjadi Error menghapus data Wisata. Coba Kembali.', true);
      } finally {
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
      }
    });
  }
};

export default Wisata_form;
