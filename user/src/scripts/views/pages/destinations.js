const {createTemplateItems,createDestinationsHeroTemplate,createFooterTemplate} = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');
const utils = require('../../utils/utils');

const Destinations = {
  async render() {
    return `
    <div class="destinationsContainer"></div>
      <h1 aria-label="penghianapan title" class="destinations title_page" tabindex="0"></h1>
      <div class="penghinapanContainer Container" aria-label="halaman penghinapan" id="container"></div>
      
    `;
  },
  async afterRender() {
    let typeData = window.location.hash.split('/')[1];
    document.querySelector('.destinations').textContent = typeData;
    const footerContainer = document.querySelector('footer');
    footerContainer.innerHTML = createFooterTemplate();
    const container = document.querySelector('.penghinapanContainer');
    const header = document.querySelector('header');
    const destinationsCollection = collection(db,typeData);
    const destinationsSnapshot = await getDocs(destinationsCollection);
    const collectionData = destinationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const destinationsContainer = document.querySelector('.destinationsContainer');
    destinationsContainer.innerHTML = createDestinationsHeroTemplate()
    const hero = document.querySelector('.search-item');
    utils._stickyNavbar({header,hero});
    const form = document.querySelector('form');
    const input = document.querySelector('.search__input');
    try {
        const dropbtn = document.querySelector('.dropbtn');
        utils._dropDownChange(dropbtn)
      const removeFieldButton = document.querySelector('.remove_button');
      utils._removeTextField({removeFieldButton,input,collectionData,container,typeData})
      utils.formInput({container,form,input,collectionData,typeData})
      utils._showItemsDestinations({container,collectionData,typeData})
      
    } catch (error) {
      console.error("Error fetching penghinapan data:", error);
    }
  },
};

module.exports = Destinations;
