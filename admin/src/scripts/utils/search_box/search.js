const search_box = {
    filterWisataData(wisataData, searchTerm) {
        return wisataData.filter(wisata => wisata.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },
    renderTable(wisataData, wisataTableBody) {
        let tableRows = '';
        wisataData.forEach((wisata, index) => {
            tableRows += `
                <tr>
                    <td>${index + 1}</td> <!-- Use index here -->
                    <td>${wisata.name}</td>
                    <td>${wisata.detail}</td>
                    <td>${wisata.location}</td>
                    <td>${wisata.openTime}</td>
                    <td>${wisata.price}</td>
                    <td><img src="${wisata.imageUrl}" alt="Image of ${wisata.name}" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button class="edit-button" data-id="${wisata.id}">Edit</button>
                        <button class="delete-button" data-id="${wisata.id}">Delete</button>
                    </td>
                </tr>
            `;
        });
        wisataTableBody.innerHTML = tableRows;
    }
};

module.exports = search_box;
