const { createTemplateItems } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');

const Kuliner = {
  async render() {
    return `
      <div class="kulinerContainer Container"></div>
    `;
  },
  async afterRender() {
    const container = document.querySelector('.kulinerContainer');

    try {
      // Fetch data from Firestore
      const kulinerCollection = collection(db, 'kuliner');
      const kulinerSnapshot = await getDocs(kulinerCollection);
      const kulinerList = kulinerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Render data
      kulinerList.forEach(item => {
        container.innerHTML += createTemplateItems(item, 'kuliner');
      });
    } catch (error) {
      console.error("Error fetching kuliner data:", error);
    }
  },
};

module.exports = Kuliner;
