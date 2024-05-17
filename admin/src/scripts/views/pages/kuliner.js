const Kuliner = {
    async render () {
      return `
        <div class="button-wrapper">
            <button id="goToAnotherPage">Go to Another Page</button>
        </div>
        <div class="search-bar">
            <span>Show:</span>
            <input type="text" placeholder="Search...">
        </div>
        <table>
            <tr>
                <th>No</th>
                <th>Nama Tempat</th>
                <th>Detail</th>
                <th>Lokasi</th>
                <th>Jam Buka</th>
                <th>Gambar</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Testing</td>
                <td>Testing1</td>
                <td>Testing</td>
                <td>07:00 - 17:30 WIB</td>
                <td><img src="example.jpg" alt="Example Image"></td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        </table>
      `;
    },
    async afterRender() {
        const goToAnotherPageButton = document.getElementById('goToAnotherPage');
        goToAnotherPageButton.addEventListener('click', function() {
            window.location.href = '/#/kuliner_form';
        });
    }
};

export default Kuliner;
