import { addWisata } from '../../../backend/wisata/wisata_handler.js'
import mapSetup from "../../../utils/maps.js"
import geocodeHelper from '../../../utils/geocode.js';

const { initializeMap, addMarkerToMap } = mapSetup;
const { geocodePlace } = geocodeHelper;

const mapboxglAccessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA';
mapboxgl.accessToken = mapboxglAccessToken;

let map;
let marker;

const Wisata_form = {
  async render() {
    return `
      <form id="wisataForm">
          <div>
              <label for="name">Nama Tempat Wisata:</label>
              <input type="text" id="name" name="name" required>
          </div>
          <div>
              <label for="location">Lokasi:</label>
              <input type="text" id="location" name="location" required>
          </div>
          <div>
              <label for="openTime">Open Time:</label>
              <input type="text" id="openTime" name="openTime" required>
          </div>
          <div>
              <label for="price">Price:</label>
              <input type="text" id="price" name="price" required>
          </div>
          <div>
              <label for="detail">Detail:</label>
              <input type="text" id="detail" name="detail" required>
          </div>
          <div>
              <label for="image">Image:</label>
              <input type="file" id="image" name="image" required>
          </div>
          <div>
              <label for="placeName">Place Name:</label>
              <input type="text" id="placeName" name="placeName">
              <button type="button" id="geocodeButton">Find Location</button>
          </div>
          <div>
              <label for="mapLocation">Map Location:</label>
              <input type="text" id="mapLocation" name="mapLocation" readonly>
              <button type="button" id="chooseLocationButton">Choose Location</button>
              <div id="map" style="height: 300px; width: 100%; display: none;"></div>
          </div>
          <button type="submit">Submit</button>
      </form>
    `;
  },

  async afterRender() {
    const mapContainer = document.getElementById('map');
    const chooseLocationButton = document.getElementById('chooseLocationButton');
    const mapLocationInput = document.getElementById('mapLocation');
    const placeNameInput = document.getElementById('placeName');
    const geocodeButton = document.getElementById('geocodeButton');
    const wisataForm = document.getElementById('wisataForm');

    chooseLocationButton.addEventListener('click', () => {
      mapContainer.style.display = 'block';

      if (!map) {
        const defaultCoordinates = [106.8456, -6.2088];
        map = initializeMap(mapboxgl, mapContainer, defaultCoordinates);

        map.on('click', (e) => {
          const coordinates = e.lngLat;
          marker = addMarkerToMap(map, coordinates, mapLocationInput, marker);
        });
      }
    });

    geocodeButton.addEventListener('click', () => {
      const placeName = placeNameInput.value;
      if (placeName) {
        geocodePlace(placeName, mapboxgl, map, mapLocationInput, marker);
      } else {
        alert('Please enter a place name.');
      }
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
      try {

        const id = await addWisata(name, location, openTime, price, detail, mapLocation, image);
        console.log('Wisata added with ID:', id);

        wisataForm.reset();
      } catch (error) {
        console.error('Error adding Wisata:', error);
        alert('Failed to add Wisata. Please try again.');
      }
    });
  }
};

export default Wisata_form;
