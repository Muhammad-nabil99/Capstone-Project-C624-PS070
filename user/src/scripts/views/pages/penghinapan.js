const { createTemplateItems } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');

const Penginapan = {
  async render() {
    return `
      <div class="penginapanContainer Container"></div>
    `;
  },
  async afterRender() {
    const container = document.querySelector('.penginapanContainer');

    try {
      const penginapanCollection = collection(db, 'penginapan');
      const penginapanSnapshot = await getDocs(penginapanCollection);
      const penginapanList = penginapanSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      penginapanList.forEach(item => {
        container.innerHTML += createTemplateItems(item);
      });
    } catch (error) {
      console.error("Error fetching penginapan data:", error);
    }
  },
};

module.exports = Penginapan;
