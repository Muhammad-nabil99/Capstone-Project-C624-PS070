import {
  createHeaderHero,
  createTemplateItems,
  createOurFeatureTemplate,
  createWhatWeOfferTemplate,
  createFooterTemplate
} from "../templates/template-creator";
import { getTopFavourite } from "../../utils/recommendation";
const utils = require("../../utils/utils");
import Data from "../../../public/data/dataAdditionAtBeranda";
import numberIncreament from "../../utils/numberIncreamentOnScroll";
const getCountOfDoc = require('../../backend/getCountOfDocs');
const Beranda = {
  async render() {
    return `
      <div class="hero"></div>
      <div class="whatWeOfferContainer"></div>
      <h1 class="ourFeature-label section-title" aria-label="our feature" tabindex="0">Our Features</h1>
      <div class="ourFeatureContainer " tabindex="0" aria-label="our feature"></div>
      <div class="recomendations ">
        <h1 tabindex="0" arial-label="rekomendasi" class="section-title">Recomendation</h1>
        <div class="container-recomendation-items"></div>
      </div>
    `;
  },
  async afterRender() {
    const footerContainer = document.querySelector('footer');
    const hero = document.querySelector(".hero");
    const header = document.querySelector("header");
    const ourFeature = document.querySelector(".ourFeatureContainer");
    const whatWeOffer = document.querySelector(".whatWeOfferContainer");
    const {wisata,kuliner,penginapan} = await getCountOfDoc();
    numberIncreament(
      [{ id: "1", value: wisata },
      { id: "2", value: kuliner },
      { id: "3", value: penginapan }]
    );
    const recommendationsContainer = document.querySelector(
      ".container-recomendation-items"
    );
    hero.innerHTML = createHeaderHero();
    // button explore
    const btnExplore = document.querySelector('.explore-btn')
    utils._btnExploreToDestinations(btnExplore)
    // sticky navbar
    utils._stickyNavbar({ header, hero });
    // what we offer
    
    whatWeOffer.innerHTML = createWhatWeOfferTemplate();
    footerContainer.innerHTML = createFooterTemplate();
    // our Feature section
    Data.forEach((data) => {
      ourFeature.innerHTML += createOurFeatureTemplate(data);
    });
    // recomendation section
    const topFavourites = await getTopFavourite();
    if (topFavourites.length === 0) {
      recommendationsContainer.innerHTML =
        "<p>No recommendations available at the moment.</p>";
    } else {
      topFavourites.forEach((item) => {
        recommendationsContainer.innerHTML += createTemplateItems(item);
      });
    }
  },
};

export default Beranda;
