const {createTemplateItems,createSpinnerLoading,createDestinationsHeroTemplate,createFooterTemplate} = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { collection, getDocs } = require('firebase/firestore');
const utils = require('../../utils/utils');

const Destinations = {
  async render() {
    return `
    <div class="destinationsContainer"></div>
      <h1 aria-label="penghianapan title" class="destinations title_page" tabindex="0"></h1>
      <div class="penghinapanContainer Container" aria-label="halaman penghinapan" id="container"></div>
      <div class="spinner"></div>
    `;
  },
  async afterRender() {
    let typeData = window.location.hash.split('/')[1];
    document.querySelector('.destinations').textContent = typeData;
    const footerContainer = document.querySelector('footer');
    footerContainer.innerHTML = createFooterTemplate();
    const container = document.querySelector('.penghinapanContainer');
    const header = document.querySelector('header');
    const spinner = document.querySelector('.spinner');
    const destinationsCollection = collection(db,typeData);
    const destinationsSnapshot = await getDocs(destinationsCollection);
    const collectionData = destinationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    spinner.innerHTML = createSpinnerLoading()
    // hero container start
    const destinationsContainer = document.querySelector('.destinationsContainer');
    destinationsContainer.innerHTML = createDestinationsHeroTemplate()
    const hero = document.querySelector('.search-item');
    utils._stickyNavbar({header,hero});
    const form = document.querySelector('form');
    const input = document.querySelector('.search__input');
    // hero container end
    utils._showElement(spinner)
    try {
      // dropdownm start
        const dropbtn = document.querySelector('.dropbtn');
        utils._dropDownChange(dropbtn)
     // dropdownm end
      const removeFieldButton = document.querySelector('.remove_button');
      utils._removeTextField({removeFieldButton,input,collectionData,container,typeData})
      utils.formInput({container,form,input,collectionData,spinner})
      utils._hideElement(spinner);
      utils._showItemsDestinations({container,collectionData,typeData})
      
    } catch (error) {
      console.error("Error fetching penghinapan data:", error);
    }
  },
};

module.exports = Destinations;
