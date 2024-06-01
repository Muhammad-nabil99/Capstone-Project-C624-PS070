import { createWisataDetailTemplate, createKulinerDetailTemplate,  createPenginapanDetailTemplate } from '../templates/template-creator';
import { db } from '../../backend/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const Detail = {
  async render() {
    return `
      <div class="detailContainer Container"></div>
    `;
  },

  async afterRender() {
    const container = document.querySelector('.detailContainer');

    const url = window.location.hash.slice(1).toLowerCase();
    const id = url.split('/')[2];
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const type = urlParams.get('type');

    try {
      let collectionName;
      let createDetailTemplate;
      if (type === 'wisata') {
        collectionName = 'wisata';
        createDetailTemplate = createWisataDetailTemplate;
      } else if (type === 'kuliner') {
        collectionName = 'kuliner';
        createDetailTemplate = createKulinerDetailTemplate;
      } else if (type === 'penginapan') {
        collectionName = 'penginapan';
        createDetailTemplate = createPenginapanDetailTemplate;
      } else {
        throw new Error('Invalid collection type');
      }

      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const itemData = docSnap.data();
        container.innerHTML = createDetailTemplate(itemData);
      } else {
        container.innerHTML = '<p>Item not found</p>';
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
      container.innerHTML = '<p>Error fetching item details</p>';
    }
  },
};

export default Detail;
