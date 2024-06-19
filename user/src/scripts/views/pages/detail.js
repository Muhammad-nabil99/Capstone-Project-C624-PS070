const { createLikeButtonTemplate, createDetailTemplate,createFooterTemplate } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { doc, getDoc } = require('firebase/firestore');
const UrlParser = require('../../routes/url-parse');
const likeButtonInitiator = require('../../utils/likeButtonInitiator');
const utils = require('../../utils/utils');

const Detail = {
  async render() {
    return `
      <div class="detailContainer"></div>
      <div class="likeContainer"></div>
    `;
  },

  async afterRender() {
    document.querySelector('header').classList.remove('sticky');
    const container = document.querySelector('.detailContainer');
    const likeButton = document.querySelector('.likeContainer');
    const footerContainer = document.querySelector('footer');

    footerContainer.innerHTML = createFooterTemplate();
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { type, id } = url;
    if (!type || !id) {
      container.innerHTML = '<p>Error: Invalid URL parameters.</p>';
      return;
    }

    try {
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);
      document.querySelector('header').classList.remove('sticky')
      if (docSnap.exists()) {
        const item = docSnap.data();
        container.innerHTML = createDetailTemplate(item, type);
        const moreDetailContainer = document.querySelector('.more-detail');
        moreDetailContainer.appendChild(likeButton)
        likeButton.innerHTML = createLikeButtonTemplate();
        likeButtonInitiator.init({
          button: document.querySelector('#likeButton'),
          item,
          type,
        });

        const mapButton = document.querySelector('.maps-detail');
        mapButton.addEventListener('click', () => {
          window.location.hash = `#/map/${type}/${id}`;
        });

      } else {
        container.innerHTML = '<p>No such document!</p>';
        console.error("No such document!");
      }
    } catch (error) {
      container.innerHTML = `<p>Error fetching detail data: ${error.message}</p>`;
      console.error("Error fetching detail data:", error);
    }
  },
};

module.exports = Detail;
