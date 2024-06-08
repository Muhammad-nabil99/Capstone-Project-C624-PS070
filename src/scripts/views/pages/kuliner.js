const { createTemplateItems } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');

const Kuliner = {
  async render() {
    return `
      <div class="kulinerContainer Container" aria-label="halaman kuliner"></div>
    `;
  },
  async afterRender() {
    const container = document.querySelector('.kulinerContainer');

    try {
<<<<<<< HEAD
=======
      // Fetch data from Firestore
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
      const kulinerCollection = collection(db, 'kuliner');
      const kulinerSnapshot = await getDocs(kulinerCollection);
      const kulinerList = kulinerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

<<<<<<< HEAD
=======
      // Render data
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
      kulinerList.forEach(item => {
        container.innerHTML += createTemplateItems(item, 'kuliner');
      });
    } catch (error) {
      console.error("Error fetching kuliner data:", error);
    }
  },
};

module.exports = Kuliner;
