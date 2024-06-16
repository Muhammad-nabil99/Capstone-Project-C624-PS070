import { getCountOfDocs } from '../../backend/dashboard_handler.js';

const Dashboard = {
  async render() {
    return `
      <div class="cards">
        <div class="card">
          <img src="../../images/wisata.png" alt="Mountain Icon">
          <span id="wisataCount">x Wisata</span>
        </div>
        <div class="card">
          <img src="../../images/kuliner.png" alt="Food Icon">
          <span id="kulinerCount">x Kuliner</span>
        </div>
        <div class="card">
          <img src="../../images/penginapan.png" alt="Hotel Icon">
          <span id="penginapanCount">x Penginapan</span>
        </div>
      </div>
    `;
  },
  
  async afterRender() {
    try {
      const counts = await getCountOfDocs();
      
      document.getElementById('wisataCount').textContent = `${counts.wisata} Wisata`;
      document.getElementById('kulinerCount').textContent = `${counts.kuliner} Kuliner`;
      document.getElementById('penginapanCount').textContent = `${counts.penginapan} Penginapan`;
    } catch (error) {
      console.error('Error mengambil data', error);
    }
  }
};

export default Dashboard;
