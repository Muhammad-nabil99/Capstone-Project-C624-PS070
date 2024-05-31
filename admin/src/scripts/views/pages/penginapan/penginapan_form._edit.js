import { getPenginapanById, updatePenginapan } from '../../../backend/penginapan/penginapan_handler.js';
import mapSetup from '../../../utils/maps.js';
import { showNotification } from '../../../utils/form_notification.js'; // Import notification handler

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Penginapan_form_edit = {
  async render() {
    return `
      <div class="button-wrapper">
        <button id="goBack">Back to List</button>
      </div>
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
          <textarea id="fasilitas" name="fasilitas" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="price">Harga:</label>
          <input type="text" id="price" name="price" required>
        </div>
        <div class="form-group">
          <label for="image">Gambar:</label>
          <input type="file" id="image" name="image" accept="image/*">
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
        <button type="submit">Update</button>
        <div id="notification" class="notification"></div>
      </form>
    `;
  },

  async afterRender() {
    const penginapanId = window.location.hash.split('/')[2];
    if (!penginapanId) {
      console.error('No Penginapan ID found in URL');
      return;
    }

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

    try {
      const penginapan = await getPenginapanById(penginapanId);
      document.getElementById('name').value = penginapan.name;
      document.getElementById('detail').value = penginapan.detail;
      document.getElementById('location').value = penginapan.location;
      document.getElementById('fasilitas').value = penginapan.fasilitas;
      document.getElementById('price').value = penginapan.price;
      document.getElementById('mapLocation').value = penginapan.mapLocation;

      if (penginapan.imageUrl) {
        imagePreview.src = penginapan.imageUrl;
        imagePreview.style.display = 'block';
        switchImageButton.style.display = 'block';
        imageInput.style.display = 'none';
      }

      const existingCoordinates = penginapan.mapLocation.split(',').map(Number).reverse();
      map.flyTo({ center: existingCoordinates, zoom: 15 });
      if (marker) {
        marker.setLngLat(existingCoordinates);
      } else {
        marker = addMarkerToMap(map, existingCoordinates, mapLocationInput, marker);
      }
    } catch (error) {
      console.error('Error fetching Penginapan data:', error);
    }

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
      const name = formData.get('name');
      const detail = formData.get('detail');
      const location = formData.get('location');
      const fasilitas = formData.get('fasilitas');
      const price = formData.get('price');
      const mapLocation = formData.get('mapLocation');
      const image = formData.get('image');

      try {
        await updatePenginapan(penginapanId, name, detail, location, fasilitas, price, mapLocation, image);
        console.log('Penginapan updated with ID:', penginapanId);
        showNotification('Penginapan updated successfully!');
        window.location.href = '/#/penginapan';
      } catch (error) {
        console.error('Error updating Penginapan:', error);
        showNotification('Failed to update Penginapan. Please try again.', true);
      }
    });

    document.getElementById('goBack').addEventListener('click', () => {
      window.location.href = '/#/penginapan';
    });
  }
};

export default Penginapan_form_edit;
