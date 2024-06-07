const { createTemplateItems } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');

const Wisata = {
  async render() {
    return `
      <div class="wisataContainer Container"></div>
    `;
  },
  async afterRender() {
    const container = document.querySelector('.wisataContainer');

    try {
      const wisataCollection = collection(db, 'wisata');
      const wisataSnapshot = await getDocs(wisataCollection);
      const wisataList = wisataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      wisataList.forEach(item => {
        container.innerHTML += createTemplateItems(item, 'wisata');
      });
    } catch (error) {
      console.error("Error fetching wisata data:", error);
    }
  },
};

module.exports = Wisata;
