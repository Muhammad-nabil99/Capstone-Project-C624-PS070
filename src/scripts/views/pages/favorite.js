const { createTemplateItems } = require('../templates/template-creator');
const FavoriteTourDB = require('../../../public/data/favoriteWisatadb')

const Favorite = {
  async render() {
    return `
            <div class="favoriteContainer Container"></div>
        `;
  },
  async afterRender() {
        const favoriteItems = await FavoriteTourDB.default.getAllTours();
        const container = document.querySelector('.favoriteContainer');
        favoriteItems.forEach(item =>{
            container.innerHTML += createTemplateItems(item);
        })
  },
};

export default Favorite;