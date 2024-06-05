const { createTemplateItems } = require('../templates/template-creator');
const FavoriteTourDB = require('../../../public/data/favoriteWisatadb')
const chechAnyExistingData = require('../../utils/checkAnyExistingData')
const Favorite = {
  async render() {
    return `
            <div class="favoriteContainer Container"></div>
        `;
  },
  async afterRender() {
        const favoriteItems = await FavoriteTourDB.default.getAllTours();
        const container = document.querySelector('.favoriteContainer');
        if(chechAnyExistingData.initialize(favoriteItems)){
          favoriteItems.forEach(item =>{
            const {type}= item;
              container.innerHTML += createTemplateItems(item,type);
          })
        }else{
          container.innerHTML = '<h2>This Page Is Empty</h2>';
        }
  },
};

export default Favorite;