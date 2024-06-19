import { getWisataById, updateWisata } from '../../../backend/wisata/wisata_handler.js';
import { setupMap } from '../../../utils/maps/map_initialization.js';
import wisata_validator from '../../../utils/form_handling/wisata_validator.js';
import { showNotification } from '../../../utils/form_handling/form_notification.js';

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Wisata_form_edit = {
  async render() {
    return `
      <div id="notification" class="notification"></div>
      <form id="wisataForm" class="wisata-form">
        <div class="form-group">
          <label for="name">Nama Tempat Wisata:</label>
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
          <label for="price">Harga:</label>
          <input type="text" id="price" name="price" >
          <div class="validation-message" id="priceValidation"></div>
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
          <label for="placeName">Nama Tempat:</label>
          <div id="geocoder" class="custom-geocoder"></div>
        </div>
        <div class="form-group">
          <label for="mapLocation">Koordinat Lokasi:</label>
          <input type="text" id="mapLocation" name="mapLocation" readonly>
          <div id="map" class="map-container"></div>
        </div>
        <button type="submit" class="submit-button">Update</button>
      </form>
    `;
  },

  async afterRender() {
    const wisataId = window.location.hash.split('/')[2];
    if (!wisataId) {
      console.error('Tidak ada ID Wisata yang ditemukan di URL');
      return;
    }

    const wisataForm = document.getElementById('wisataForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const imageLabel = document.getElementById('imageLabel');
    const mapLocationInput = document.getElementById('mapLocation');

    const defaultCoordinates = [106.8456, -6.2088];
    ({ map, marker } = setupMap(defaultCoordinates));

    let initialData;
    try {
      const wisata = await getWisataById(wisataId);
      initialData = wisata;
      document.getElementById('name').value = wisata.name;
      document.getElementById('location').value = wisata.location;
      document.getElementById('openTime').value = wisata.openTime;
      document.getElementById('price').value = wisata.price;
      document.getElementById('detail').value = wisata.detail;
      document.getElementById('mapLocation').value = wisata.mapLocation;

      if (wisata.imageUrl) {
        imagePreview.src = wisata.imageUrl;
        imagePreview.style.display = 'block';
      }

      const existingCoordinates = wisata.mapLocation.split(',').map(Number).reverse();
      map.flyTo({ center: existingCoordinates, zoom: 15 });
      if (marker) {
        marker.setLngLat(existingCoordinates);
      } else {
        // eslint-disable-next-line no-undef
        marker = addMarkerToMap(map, existingCoordinates, mapLocationInput, marker);
      }
    } catch (error) {
      console.error('Terjadi Error mengambil data wisata:', error);
    }

    wisata_validator.setupImageInput(imageInput, imagePreview, imageLabel);

    wisataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(wisataForm);
      if (!wisata_validator.validateForm(formData)) {
        return;
      }

      const name = formData.get('name').trim();
      const location = formData.get('location').trim();
      const openTime = formData.get('openTime').trim();
      const price = formData.get('price').trim();
      const detail = formData.get('detail').trim();
      const mapLocation = formData.get('mapLocation').trim();
      const image = formData.get('image');

      const updates = {};
      if (name !== initialData.name) updates.name = name;
      if (location !== initialData.location) updates.location = location;
      if (openTime !== initialData.openTime) updates.openTime = openTime;
      if (price !== initialData.price) updates.price = price;
      if (detail !== initialData.detail) updates.detail = detail;
      if (mapLocation !== initialData.mapLocation) updates.mapLocation = mapLocation;

      try {
        await updateWisata(wisataId, updates, image);
        showNotification('Data Wisata berhasil diperbarui!');
        setTimeout(() => {
          window.location.href = '/#/wisata';
        }, 1500);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        showNotification('Terjadi Error menghapus data Wisata. Coba Kembali.', true);
      }
    });
  }
};

export default Wisata_form_edit;
