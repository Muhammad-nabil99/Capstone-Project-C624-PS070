const { getDocs, collection, deleteDoc, doc } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');

const Wisata = {
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
        try {
            const querySnapshot = await getDocs(collection(db, 'wisata'));
            let tableRows = '';
            let index = 0;
            querySnapshot.forEach((doc) => {
                const wisata = doc.data();
                index++;
                tableRows += `
                    <tr>
                        <td>${index}</td> <!-- Use index here -->
                        <td>${wisata.name}</td>
                        <td>${wisata.detail}</td>
                        <td>${wisata.location}</td>
                        <td>${wisata.openTime}</td>
                        <td>${wisata.price}</td>
                        <td><img src="${wisata.imageUrl}" alt="Image of ${wisata.name}" style="width: 50px; height: 50px;"></td>
                        <td>
                            <button class="edit-button" data-id="${doc.id}">Edit</button>
                            <button class="delete-button" data-id="${doc.id}">Delete</button>
                        </td>
                    </tr>
                `;
            });
            wisataTableBody.innerHTML = tableRows;

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
