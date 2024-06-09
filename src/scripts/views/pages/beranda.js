import { createHeaderHero, createRecomendationsItemsTemplate, createCaterogyItemsTemplate } from '../templates/template-creator';
import { getTopFavourite } from '../../utils/recommendation';

const Beranda = {
  async render() {
    return `
      <div class="hero"></div>
      <div class="category"></div>
      <div class="recomendations">
        <h1 tabindex="0" arial-label="rekomendasi">Rekomendasi</h1>
        <div class="container-recomendation-items"></div>
      </div>
    `;
  },
  async afterRender() {
    const category = document.querySelector('.category');
    const hero = document.querySelector('.hero');
    const recommendationsContainer = document.querySelector('.container-recomendation-items');

    hero.innerHTML = createHeaderHero();
    category.innerHTML = createCaterogyItemsTemplate();

    const topFavourites = await getTopFavourite();

    if (topFavourites.length === 0) {
      recommendationsContainer.innerHTML = '<p>No recommendations available at the moment.</p>';
    } else {
      topFavourites.forEach((item) => {
        recommendationsContainer.innerHTML += createRecomendationsItemsTemplate(item);
      });
    }
  },
};

export default Beranda;
