const { getDocs, collection } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');
const searchBox = require('../../../utils/search_box/search_penginapan.js');
const { deletePenginapan } = require('../../../backend/penginapan/penginapan_handler.js');
const { applyTextShortener } = require('../../../utils/text-shortener.js');
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
const Penginapan = {
    async render() {
        return `
            <div class="button-wrapper">
                <button id="goToAnotherPage">Isi Data</button>
            </div>
            <div class="search-bar">
                <span>Search:</span>
                <input type="text" id="searchInput" placeholder="Search...">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Penginapan</th>
                        <th>Detail</th>
                        <th>Lokasi</th>
                        <th>Harga</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="penginapanTableBody">
                </tbody>
            </table>
        `;
    },
    async afterRender() {
        const goToAnotherPageButton = document.getElementById('goToAnotherPage');
        goToAnotherPageButton.addEventListener('click', function() {
            window.location.href = '/#/penginapan_form';
        });

        const penginapanTableBody = document.getElementById('penginapanTableBody');
        const searchInput = document.getElementById('searchInput');

        try {
            const querySnapshot = await getDocs(collection(db, 'penginapan'));
            let penginapanData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                penginapanData.push({ id: doc.id, ...data });
            });

            const renderTable = (data) => {
                penginapanTableBody.innerHTML = '';
                data.forEach((item, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.name}</td>
                            <td class="shorten-text">${item.detail}</td>
                            <td>${item.location}</td>
                            <td>${item.price}</td>
                            <td><img data-src="${item.imageUrl}" alt="${item.name}" width="100" class="lazyload"></td>
                            <td>
                                <button class="edit-button" data-id="${item.id}">Edit</button>
                                <button class="delete-button" data-id="${item.id}">Delete</button>
                            </td>
                        </tr>
                    `;
                    penginapanTableBody.innerHTML += row;
                });

                document.querySelectorAll('.edit-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const penginapanId = event.target.getAttribute('data-id');
                        window.location.href = `/#/penginapan_form_edit/${penginapanId}`;
                    });
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', async (event) => {
                        const penginapanId = event.target.getAttribute('data-id');
                        try {
                            await deletePenginapan(penginapanId);
                            alert('Penginapan deleted successfully');
                            window.location.reload();
                        } catch (error) {
                            console.error('Error deleting Penginapan:', error);
                            alert('Gagal menghapus data Penginapan. Coba kembali.');
                        }
                    });
                });

                applyTextShortener('#penginapanTableBody tr', '.shorten-text', 100);
            };

            renderTable(penginapanData);

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = searchBox.filterData(penginapanData, searchTerm);
                renderTable(filteredData);
            });

        } catch (error) {
            console.error('Error mengambil data penginapan:', error);
        }
    }
};

export default Penginapan;
