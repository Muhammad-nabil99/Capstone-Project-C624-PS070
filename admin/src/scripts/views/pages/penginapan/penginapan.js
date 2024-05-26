const { getDocs, collection, deleteDoc, doc } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');

const Penginapan = {
    async render() {
        return `
            <div class="button-wrapper">
                <button id="goToAnotherPage">Go to Another Page</button>
            </div>
            <div class="search-bar">
                <span>Show:</span>
                <input type="text" placeholder="Search...">
            </div>
            <table>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Detail</th>
                    <th>Lokasi</th>
                    <th>Fasilitas</th>
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
        try {
            const querySnapshot = await getDocs(collection(db, 'penginapan'));
            let tableRows = '';
            let index = 0;
            querySnapshot.forEach((doc) => {
                const penginapan = doc.data();
                index++;
                tableRows += `
                    <tr>
                        <td>${index}</td>
                        <td>${penginapan.name}</td>
                        <td>${penginapan.detail}</td>
                        <td>${penginapan.location}</td>
                        <td>${penginapan.fasilitas}</td>
                        <td>${penginapan.price}</td>
                        <td><img src="${penginapan.imageUrl}" alt="Image of ${penginapan.name}" style="width: 50px; height: 50px;"></td>
                        <td>
                            <button class="edit-button" data-id="${doc.id}">Edit</button>
                            <button class="delete-button" data-id="${doc.id}">Delete</button>
                        </td>
                    </tr>
                `;
            });
            penginapanTableBody.innerHTML = tableRows;

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
                        await deleteDoc(doc(db, 'penginapan', penginapanId));
                        alert('Wisata deleted successfully');
                        window.location.reload();
                    } catch (error) {
                        console.error('Error deleting Wisata:', error);
                        alert('Failed to delete Wisata. Please try again.');
                    }
                });
            });

        } catch (error) {
            console.error('Error fetching penginapan data:', error);
        }
    }
};

module.exports = Penginapan;
