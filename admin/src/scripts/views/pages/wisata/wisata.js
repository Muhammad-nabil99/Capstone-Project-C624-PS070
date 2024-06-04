const { getDocs, collection, deleteDoc, doc } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');
const search_box = require('../../../utils/search_box/search_wisata.js');
const { deleteWisata } = require('../../../backend/wisata/wisata_handler.js');
const { generateDetailHTML, initializeTextShortener } = require('../../../utils/text-shortener.js');

const Wisata = {
  async render() {
    return `
      <div class="button-wrapper">
        <button id="goToAnotherPage">Isi Data</button>
      </div>
      <div class="search-bar">
        <span>Show:</span>
        <input type="text" id="searchInput" placeholder="Search...">
      </div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Wisata</th>
            <th>Detail</th>
            <th>Lokasi</th>
            <th>Jam Buka</th>
            <th>Harga</th>
            <th>Gambar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody id="wisataTableBody">
        </tbody>
      </table>
    `;
  },
  async afterRender() {
    const goToAnotherPageButton = document.getElementById('goToAnotherPage');
    goToAnotherPageButton.addEventListener('click', function() {
      window.location.href = '/#/wisata_form';
    });

    const wisataTableBody = document.getElementById('wisataTableBody');
    const searchInput = document.getElementById('searchInput');

    try {
      const querySnapshot = await getDocs(collection(db, 'wisata'));
      let wisataData = [];
      querySnapshot.forEach((doc) => {
        wisataData.push({ id: doc.id, ...doc.data() });
      });

      const renderTable = (data) => {
        wisataTableBody.innerHTML = '';
        data.forEach((item, index) => {
          const detailHTML = generateDetailHTML(item.detail);
          const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${item.name}</td>
              <td>${detailHTML}</td>
              <td>${item.location}</td>
              <td>${item.openTime}</td>
              <td>${item.price}</td>
              <td><img src="${item.imageUrl}" alt="${item.name}" width="100"></td>
              <td>
                <button class="edit-button" data-id="${item.id}">Edit</button>
                <button class="delete-button" data-id="${item.id}">Delete</button>
              </td>
            </tr>
          `;
          wisataTableBody.innerHTML += row;
        });

        document.querySelectorAll('.edit-button').forEach(button => {
          button.addEventListener('click', (event) => {
            const wisataId = event.target.getAttribute('data-id');
            window.location.href = `/#/wisata_form_edit/${wisataId}`;
          });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
          button.addEventListener('click', async (event) => {
            const wisataId = event.target.getAttribute('data-id');
            try {
              await deleteWisata(wisataId);
              alert('Wisata deleted successfully');
              window.location.reload();
            } catch (error) {
              console.error('Error deleting Wisata:', error);
              alert('Failed to delete Wisata. Please try again.');
            }
          });
        });
      };

      renderTable(wisataData);

      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = search_box.filterWisataData(wisataData, searchTerm);
        renderTable(filteredData);
      });

      initializeTextShortener();

    } catch (error) {
      console.error('Error fetching wisata data:', error);
    }
  }
};

module.exports = Wisata;
