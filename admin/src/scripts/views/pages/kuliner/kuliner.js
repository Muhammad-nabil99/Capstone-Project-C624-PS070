const { getDocs, collection } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');
const { deleteKuliner } = require('../../../backend/kuliner/kuliner_handler.js');
const searchBox = require('../../../utils/search_box/search_kuliner.js');
const { applyTextShortener } = require('../../../utils/text-shortener.js');
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
const Kuliner = {
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
                        <th>Nama Kuliner</th>
                        <th>Detail</th>
                        <th>Lokasi</th>
                        <th>Jam Buka</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="kulinerTableBody">
                </tbody>
            </table>
        `;
    },
    async afterRender() {
        const goToAnotherPageButton = document.getElementById('goToAnotherPage');
        goToAnotherPageButton.addEventListener('click', function() {
            window.location.href = '/#/kuliner_form';
        });

        const kulinerTableBody = document.getElementById('kulinerTableBody');
        const searchInput = document.getElementById('searchInput');

        try {
            const querySnapshot = await getDocs(collection(db, 'kuliner'));
            let kulinerData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                kulinerData.push({ id: doc.id, ...data });
            });

            const renderTable = (data) => {
                kulinerTableBody.innerHTML = '';
                data.forEach((item, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.name}</td>
                            <td class="shorten-text">${item.detail}</td>
                            <td>${item.location}</td>
                            <td>${item.openTime}</td>
                            <td><img data-src="${item.imageUrl}" alt="${item.name}" width="100" class="lazyload"></td>
                            <td>
                                <button class="edit-button" data-id="${item.id}">Edit</button>
                                <button class="delete-button" data-id="${item.id}">Delete</button>
                            </td>
                        </tr>
                    `;
                    kulinerTableBody.innerHTML += row;
                });

                document.querySelectorAll('.edit-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const kulinerId = event.target.getAttribute('data-id');
                        window.location.href = `/#/kuliner_form_edit/${kulinerId}`;
                    });
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', async (event) => {
                        const kulinerId = event.target.getAttribute('data-id');
                        try {
                            await deleteKuliner(kulinerId);
                            alert('Data Kuliner berhasil dihapus!');
                            window.location.reload();
                        } catch (error) {
                            console.error('Error menghapus data Kuliner:', error);
                            alert('Gagal menghapus data Kuliner. Coba kembali.');
                        }
                    });
                });
                applyTextShortener('#kulinerTableBody tr', '.shorten-text', 100);
            };

            renderTable(kulinerData);

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = searchBox.filterData(kulinerData, searchTerm);
                renderTable(filteredData);
            });

        } catch (error) {
            console.error('Gagal mengambil data Kuliner:', error);
        }
    }
};

export default Kuliner;
