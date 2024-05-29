const { getDocs, collection, deleteDoc, doc } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');
const search_box = require('../../../utils/search.js');

const Wisata = {
    async render() {
        return `
            <div class="button-wrapper">
                <button id="goToAnotherPage">Go to Another Page</button>
            </div>
            <div class="search-bar">
                <span>Show:</span>
                <input type="text" id="searchInput" placeholder="Search...">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
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

            search_box.renderTable(wisataData, wisataTableBody);

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = search_box.filterWisataData(wisataData, searchTerm);
                search_box.renderTable(filteredData, wisataTableBody);
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
                        await deleteDoc(doc(db, 'wisata', wisataId));
                        alert('Wisata deleted successfully');
                        window.location.reload();
                    } catch (error) {
                        console.error('Error deleting Wisata:', error);
                        alert('Failed to delete Wisata. Please try again.');
                    }
                });
            });

        } catch (error) {
            console.error('Error fetching wisata data:', error);
        }
    }
};

module.exports = Wisata;
