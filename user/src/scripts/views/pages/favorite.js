const { createTemplateItems,createFooterTemplate } = require('../templates/template-creator');
const FavoriteTourDB = require('../../../public/data/favoriteWisatadb')
const utils = require('../../utils/utils');
const Favorite = {
  async render() {
    return `
            <h1 aria-label="favorite" class="title_page" id="favorite" tabindex="0" >Favorite</h1>
            <div class="favoriteContainer Container" aria-label="halaman favorite" id="container"></div>
        `;
  },
  async afterRender() {
    const footerContainer = document.querySelector('footer');
    footerContainer.innerHTML = createFooterTemplate();
    const collectionData = await FavoriteTourDB.default.getAllTours();
    const hero  = document.querySelector('.favoriteContainer');
    const header = document.querySelector('header')
    utils._stickyNavbar({header,hero})
        if(utils.initialize(collectionData)){
          collectionData.forEach(item =>{
            const {type}= item;
            container.innerHTML += createTemplateItems(item,type);
          })
        }else{
          container.innerHTML = '<h2>This Page Is Empty</h2>';
        }
  },
};

export default Favorite;