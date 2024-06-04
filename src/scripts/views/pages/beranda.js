import { createHeaderHero, createRecomendationsItemsTemplate, createServiceItemsTemplate } from '../templates/template-creator';

const Beranda = {
  async render() {
    return `
            <div class="hero"></div>
            <div class="options"></div>
            <div class="recomendations">
            <h1 tabindex="0" arial-label="rekomendasi">Rekomendasi</h1>
            <div class="container-recomendation-items"></>
            </div>
        `;
  },
  async afterRender() {
    const options = document.querySelector('.options');
    const hero = document.querySelector('.hero');
    const recomendations = document.querySelector('.container-recomendation-items');
    hero.innerHTML = createHeaderHero();
    options.innerHTML = createServiceItemsTemplate();
    const temporaryImage = ['7e4e6b34da38e5d72cd0be82ae280504', '6301bbcba802bf6536ac8ec6558b3621', '94773ff0b79bc30ddbfa13396d7be8d9', 'c84313d02549e1a6df789d4846105e70'];

    temporaryImage.forEach((item) => {
      console.log(item);
      recomendations.innerHTML += createRecomendationsItemsTemplate(item);
    });
  },
};

export default Beranda;