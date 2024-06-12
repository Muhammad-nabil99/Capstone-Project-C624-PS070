import { getWisataById, updateWisata } from '../../../backend/wisata/wisata_handler.js';
import mapSetup from '../../../utils/maps.js';

const { initializeMap, addMarkerToMap } = mapSetup;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Wisata_form_edit = {
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
          <label for="openTime">Open Time:</label>
          <input type="text" id="openTime" name="openTime" required>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" required>
        </div>
        <div class="form-group">
          <label for="detail">Detail:</label>
          <input type="text" id="detail" name="detail" required>
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
        <button type="submit">Update</button>
      </form>
    `;
  },

  async afterRender() {
    const wisataId = window.location.hash.split('/')[2];
    if (!wisataId) {
      console.error('No Wisata ID found in URL');
      return;
    }

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
        marker = addMarkerToMap(map, existingCoordinates, mapLocationInput, marker);
      }
    } catch (error) {
      console.error('Error fetching Wisata data:', error);
    }

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
      // To ensure the change event is fired even if the same file is selected again
      imageInput.value = '';
    });

    wisataForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const location = document.getElementById('location').value;
      const openTime = document.getElementById('openTime').value;
      const price = document.getElementById('price').value;
      const detail = document.getElementById('detail').value;
      const mapLocation = document.getElementById('mapLocation').value;
      const image = document.getElementById('image').files[0];

      const updates = {};
      if (name !== initialData.name) updates.name = name;
      if (location !== initialData.location) updates.location = location;
      if (openTime !== initialData.openTime) updates.openTime = openTime;
      if (price !== initialData.price) updates.price = price;
      if (detail !== initialData.detail) updates.detail = detail;
      if (mapLocation !== initialData.mapLocation) updates.mapLocation = mapLocation;

      if (image && !['image/png', 'image/jpeg', 'image/jpg'].includes(image.type)) {
        alert('Only PNG, JPEG, and JPG images are allowed');
        return;
      }

      try {
        await updateWisata(wisataId, updates, image);
        console.log('Wisata updated with ID:', wisataId);
        alert('Wisata updated successfully');
        window.location.href = '/#/wisata';
      } catch (error) {
        console.error('Error updating Wisata:', error);
        alert('Failed to update Wisata. Please try again.');
      }
    });
  }
};

export default Wisata_form_edit;
