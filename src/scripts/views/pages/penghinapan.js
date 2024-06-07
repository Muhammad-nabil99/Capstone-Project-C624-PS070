const { createTemplateItems } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');

const Penghinapan = {
  async render() {
    return `
      <div class="penghinapanContainer Container"></div>
    `;
  },
  async afterRender() {
    const container = document.querySelector('.penghinapanContainer');

    try {
      const penghinapanCollection = collection(db, 'penginapan');
      const penghinapanSnapshot = await getDocs(penghinapanCollection);
      const penghinapanList = penghinapanSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      penghinapanList.forEach(item => {
        container.innerHTML += createTemplateItems(item, 'penginapan');
      });
    } catch (error) {
      console.error("Error fetching penghinapan data:", error);
    }
  },
};

module.exports = Penghinapan;
