import { getCountOfDocs } from '../../backend/dashboard_handler.js';

const Dashboard = {
  async render() {
    return `
      <div class="cards">
        <div class="card">
          <img src="../../images/wisata.jpeg" alt="Mountain Icon">
          <span id="wisataCount">x Wisata</span>
        </div>
        <div class="card">
          <img src="../../images/kuliner.jpeg" alt="Food Icon">
          <span id="kulinerCount">x Kuliner</span>
        </div>
        <div class="card">
          <img src="../../images/penginapan.jpeg" alt="Hotel Icon">
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
      console.error('Error fetching counts:', error);
    }
  }
};

export default Dashboard;
