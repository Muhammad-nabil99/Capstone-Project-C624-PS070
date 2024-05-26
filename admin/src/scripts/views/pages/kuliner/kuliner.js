const { getDocs, collection, deleteDoc, doc } = require('firebase/firestore');
const { db } = require('../../../backend/firebase.js');

const Kuliner = {
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
                    <th>Harga</th>
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
        try {
            const querySnapshot = await getDocs(collection(db, 'kuliner'));
            let tableRows = '';
            let index = 0;
            querySnapshot.forEach((doc) => {
                const kuliner = doc.data();
                index++;
                tableRows += `
                    <tr>
                        <td>${index}</td>
                        <td>${kuliner.name}</td>
                        <td>${kuliner.detail}</td>
                        <td>${kuliner.location}</td>
                        <td>${kuliner.fasilitas}</td>
                        <td>${kuliner.price}</td>
                        <td><img src="${kuliner.imageUrl}" alt="Image of ${kuliner.name}" style="width: 50px; height: 50px;"></td>
                        <td>
                            <button class="edit-button" data-id="${doc.id}">Edit</button>
                            <button class="delete-button" data-id="${doc.id}">Delete</button>
                        </td>
                    </tr>
                `;
            });
            kulinerTableBody.innerHTML = tableRows;

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
                        await deleteDoc(doc(db, 'kuliner', kulinerId));
                        alert('Wisata deleted successfully');
                        window.location.reload();
                    } catch (error) {
                        console.error('Error deleting Wisata:', error);
                        alert('Failed to delete Wisata. Please try again.');
                    }
                });
            });

        } catch (error) {
            console.error('Error fetching kuliner data:', error);
        }
    }
};

module.exports = Kuliner;
