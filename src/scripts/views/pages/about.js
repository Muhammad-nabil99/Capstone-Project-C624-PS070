const { createCardAboutUs,createTaglineAboutUs ,createFooterTemplate} = require('../templates/template-creator');
import datas from '../../../public/data/dataMember';
const utils = require('../../utils/utils')
const About = {
  async render() {
    return `
    <div class="taglineAboutUs" aria-label="tagline halaman about" data-aos="fade-up"></div>
    <h1 aria-label="about us" class="title_page" id="about" tabindex="0" >Tentang Kami</h1>
    <div class="aboutContainer Container" aria-label="halaman about" id="container"></div>
    `;
  },
  async afterRender() {
        try {
          const hero = document.querySelector('.taglineAboutUs');
          const header = document.querySelector('header')
          utils._stickyNavbar({ header, hero});
          const footerContainer = document.querySelector('footer');
          footerContainer.innerHTML = createFooterTemplate();
            hero.innerHTML = createTaglineAboutUs();
            const aboutContainer = document.querySelector('.aboutContainer');
            for (const data of datas) {
                aboutContainer.innerHTML += createCardAboutUs(data);
            }
        } catch (error) {
            
        }
   
}
}
export default About;