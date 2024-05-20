const { getDocs, collection } = require('firebase/firestore');
const { db } = require('../../backend/firebase.js');

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
                        <th>Name</th>
                        <th>Detail</th>
                        <th>Location</th>
                        <th>Open Time</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
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
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                `;
            });
            wisataTableBody.innerHTML = tableRows;
        } catch (error) {
            console.error('Error fetching wisata data:', error);
        }
    }
};

module.exports = Wisata;
