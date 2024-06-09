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
<<<<<<< HEAD
=======
      // Fetch data from Firestore
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
      const kulinerCollection = collection(db, 'kuliner');
      const kulinerSnapshot = await getDocs(kulinerCollection);
      const kulinerList = kulinerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
      // Render data
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
      kulinerList.forEach(item => {
        container.innerHTML += createTemplateItems(item, 'kuliner');
      });
    } catch (error) {
      console.error("Error fetching kuliner data:", error);
    }
  },
};

module.exports = Kuliner;
