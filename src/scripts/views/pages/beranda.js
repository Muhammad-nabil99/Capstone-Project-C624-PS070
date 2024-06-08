<<<<<<< HEAD
import { createHeaderHero, createRecomendationsItemsTemplate, createCaterogyItemsTemplate } from '../templates/template-creator';
import { getTopFavourite } from '../../utils/recommendation';
=======
import {createHeaderHero, createRecomendationsItemsTemplate, createCaterogyItemsTemplate} from '../templates/template-creator';
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735

const Beranda = {
  async render() {
    return `
<<<<<<< HEAD
      <div class="hero"></div>
      <div class="category"></div>
      <div class="recomendations">
        <h1 tabindex="0" arial-label="rekomendasi">Rekomendasi</h1>
        <div class="container-recomendation-items"></div>
      </div>
    `;
=======
            <div class="hero"></div>
            <div class="category"></div>
            <div class="recomendations">
            <h1 tabindex="0" arial-label="rekomendasi">Rekomendasi</h1>
            <div class="container-recomendation-items"></>
            </div>
        `;
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
  },
  async afterRender() {
    const category = document.querySelector('.category');
    const hero = document.querySelector('.hero');
<<<<<<< HEAD
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
=======
    const recomendations = document.querySelector('.container-recomendation-items');
    hero.innerHTML = createHeaderHero();
    category.innerHTML = createCaterogyItemsTemplate();
    const temporaryImage = ['7e4e6b34da38e5d72cd0be82ae280504', '6301bbcba802bf6536ac8ec6558b3621', '94773ff0b79bc30ddbfa13396d7be8d9', 'c84313d02549e1a6df789d4846105e70'];

    temporaryImage.forEach((item) => {
      console.log(item);
      recomendations.innerHTML += createRecomendationsItemsTemplate(item);
    });
  },
};

export default Beranda;
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
