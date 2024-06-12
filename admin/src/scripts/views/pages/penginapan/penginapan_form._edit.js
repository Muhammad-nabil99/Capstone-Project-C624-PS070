import { getPenginapanById, updatePenginapan } from '../../../backend/penginapan/penginapan_handler.js';
import mapSetup from '../../../utils/maps.js';

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Penginapan_form_edit = {
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
          <textarea id="fasilitas" name="fasilitas" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="price">Harga:</label>
          <input type="text" id="price" name="price" required>
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
    const penginapanId = window.location.hash.split('/')[2];
    if (!penginapanId) {
      console.error('No Penginapan ID found in URL');
      return;
    }

    const mapContainer = document.getElementById('map');
    const mapLocationInput = document.getElementById('mapLocation');
    const penginapanForm = document.getElementById('penginapanForm');
    const imagePreview = document.getElementById('imagePreview');
    const imageInput = document.getElementById('image');
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
        imageLabel.textContent = 'Ganti gambar';
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

    penginapanForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const detail = document.getElementById('detail').value;
      const location = document.getElementById('location').value;
      const fasilitas = document.getElementById('fasilitas').value;
      const price = document.getElementById('price').value;
      const mapLocation = document.getElementById('mapLocation').value;
      const image = document.getElementById('image').files[0];

      const updates = {};
      if (name !== initialData.name) updates.name = name;
      if (location !== initialData.location) updates.location = location;
      if (fasilitas !== initialData.fasilitas) updates.fasilitas = fasilitas;
      if (price !== initialData.price) updates.price = price;
      if (detail !== initialData.detail) updates.detail = detail;
      if (mapLocation !== initialData.mapLocation) updates.mapLocation = mapLocation;

      if (image && !['image/png', 'image/jpeg', 'image/jpg'].includes(image.type)) {
        alert('Only PNG, JPEG, and JPG images are allowed');
        return;
      }

      try {
        await updatePenginapan(penginapanId, updates, image);
        console.log('Penginapan updated with ID:', penginapanId);
        alert('Penginapan updated successfully');
        window.location.href = '/#/penginapan';
      } catch (error) {
        console.error('Error updating Penginapan:', error);
        alert('Failed to update Penginapan. Please try again.');
      }
    });
  }
};

export default Penginapan_form_edit;
