const Wisata_form = {
    async render() {
        return `
            <form id="wisataForm">
                <div>
                    <label for="name">Nama Tempat Wisata:</label>
                    <input type="text" id="name" name="name">
                </div>
                <div>
                    <label for="location">Lokasi:</label>
                    <input type="text" id="location" name="location">
                </div>
                <div>
                    <label for="openTime">Open Time:</label>
                    <input type="text" id="openTime" name="openTime">
                </div>
                <div>
                    <label for="price">Price:</label>
                    <input type="text" id="price" name="price">
                </div>
                <div>
                    <label for="detail">Detail:</label>
                    <input type="text" id="detail" name="detail">
                </div>
                <div>
                    <label for="image">Image:</label>
                    <input type="file" id="image" name="image">
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
        mapboxgl.accessToken = 'pk.eyJ1IjoiZjE3MjZ5YjE0MCIsImEiOiJjbHdhMXYyOGcwYW40Mmlxazg2aTBqYWl6In0.7vkdPDBmhzZq38n2jFNEjA'; // Replace with your Mapbox access token

        const mapContainer = document.getElementById('map');
        const chooseLocationButton = document.getElementById('chooseLocationButton');
        const mapLocationInput = document.getElementById('mapLocation');
        const placeNameInput = document.getElementById('placeName');
        const geocodeButton = document.getElementById('geocodeButton');

        let map;
        let marker;

        chooseLocationButton.addEventListener('click', () => {
            mapContainer.style.display = 'block';

            if (!map) {
                map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [106.8456, -6.2088],
                    zoom: 12
                });

                map.on('click', (e) => {
                    const coordinates = e.lngLat;
                    if (marker) {
                        marker.setLngLat(coordinates);
                    } else {
                        marker = new mapboxgl.Marker()
                            .setLngLat(coordinates)
                            .addTo(map);
                    }
                    mapLocationInput.value = `${coordinates.lat},${coordinates.lng}`;
                });
            }
        });

        geocodeButton.addEventListener('click', () => {
            const placeName = placeNameInput.value;
            if (placeName) {
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${mapboxgl.accessToken}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.features.length > 0) {
                            const coordinates = data.features[0].center;
                            mapLocationInput.value = `${coordinates[1]},${coordinates[0]}`;
                            if (map) {
                                map.flyTo({ center: coordinates, zoom: 15 });
                                if (marker) {
                                    marker.setLngLat(coordinates);
                                } else {
                                    marker = new mapboxgl.Marker()
                                        .setLngLat(coordinates)
                                        .addTo(map);
                                }
                            } else {
                                mapContainer.style.display = 'block';
                                map = new mapboxgl.Map({
                                    container: 'map',
                                    style: 'mapbox://styles/mapbox/streets-v11',
                                    center: coordinates,
                                    zoom: 15
                                });
                                marker = new mapboxgl.Marker()
                                    .setLngLat(coordinates)
                                    .addTo(map);
                            }
                        } else {
                            alert('Location not found.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred while fetching the location.');
                    });
            } else {
                alert('Please enter a place name.');
            }
        });

        // document.getElementById('wisataForm').addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     // Handle form submission and save data to the database
        //     const formData = new FormData(e.target);
        //     const data = Object.fromEntries(formData.entries());
        //     fetch('/save-location', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         alert('Form submitted successfully!');
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        // });
    }
};

export default Wisata_form;
