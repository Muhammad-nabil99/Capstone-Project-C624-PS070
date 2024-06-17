import { getPenginapanById, updatePenginapan } from '../../../backend/penginapan/penginapan_handler.js';
import { setupMap } from '../../../utils/maps/map_initialization.js';
import penginapan_validator from '../../../utils/form_handling/penginapan_validator.js';
import { showNotification } from '../../../utils/form_handling/form_notification.js';

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Penginapan_form_edit = {
  async render() {
    return `
      <div id="notification" class="notification"></div>
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
          <textarea id="fasilitas" name="fasilitas" rows="3"></textarea>
          <div id="fasilitasValidation" class="validation-message"></div>
        </div>
        <div class="form-group">
          <label for="price">Harga:</label>
          <input type="text" id="price" name="price" placeholder="Rp.">
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
        <button type="submit" class="submit-button">Update</button>
        <div id="loadingSpinner" class="loading-spinner" style="display: none;">Loading...</div>
      </form>
    `;
  },

  async afterRender() {
    const penginapanId = window.location.hash.split('/')[2];
    if (!penginapanId) {
      console.error('Tidak ada ID Penginapan yang ditemukan di URL');
      return;
    }

    const penginapanForm = document.getElementById('penginapanForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    const mapLocationInput = document.getElementById('mapLocation');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = penginapanForm.querySelector('button[type="submit"]');

    const defaultCoordinates = [106.8456, -6.2088];
    ({ map, marker } = setupMap(defaultCoordinates, mapLocationInput));

    let initialData;
    try {
      const penginapan = await getPenginapanById(penginapanId);
      initialData = penginapan;
      document.getElementById('name').value = penginapan.name;
      document.getElementById('detail').value = penginapan.detail;
      document.getElementById('location').value = penginapan.location;
      document.getElementById('fasilitas').value = penginapan.fasilitas;
      document.getElementById('price').value = penginapan.price;
      document.getElementById('mapLocation').value = penginapan.mapLocation;

      if (penginapan.imageUrl) {
        imagePreview.src = penginapan.imageUrl;
        imagePreview.style.display = 'block';
        imageLabel.textContent = 'Switch image';
      }

      const existingCoordinates = penginapan.mapLocation.split(',').map(Number).reverse();
      map.flyTo({ center: existingCoordinates, zoom: 15 });
      if (marker) {
        marker.setLngLat(existingCoordinates);
      } else {
        // eslint-disable-next-line no-undef
        marker = addMarkerToMap(map, existingCoordinates, mapLocationInput, marker);
      }
    } catch (error) {
      console.error('Error mengambil data Penginapan:', error);
    }

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

      const isValid = penginapan_validator.validateForm(formData);

      if (!isValid) {
        return;
      }

      try {
        loadingSpinner.style.display = 'block';
        submitButton.disabled = true;

        const name = formData.get('name');
        const detail = formData.get('detail');
        const location = formData.get('location');
        const fasilitas = formData.get('fasilitas');
        const price = formData.get('price');
        const mapLocation = formData.get('mapLocation');
        const image = formData.get('image');

        const updates = {};
        if (name !== initialData.name) updates.name = name;
        if (location !== initialData.location) updates.location = location;
        if (fasilitas !== initialData.fasilitas) updates.fasilitas = fasilitas;
        if (price !== initialData.price) updates.price = price;
        if (detail !== initialData.detail) updates.detail = detail;
        if (mapLocation !== initialData.mapLocation) updates.mapLocation = mapLocation;

        await updatePenginapan(penginapanId, updates, image);

        console.log('Data Penginapan diperbarui dengan ID:', penginapanId);
        showNotification('Data Penginapan berhasil diperbarui!');
        setTimeout(() => {
          window.location.href = '/#/penginapan';
        }, 1500);
      } catch (error) {
        console.error('Error updating Penginapan:', error);
        showNotification('Gagal memperbarui data Penginapan. Coba Kembali.', true);
      } finally {
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
      }
    });
  }
};

export default Penginapan_form_edit;
