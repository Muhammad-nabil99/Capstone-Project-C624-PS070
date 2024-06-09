const { createLikeButtonTemplate, createDetailTemplate } = require('../templates/template-creator');
const { db } = require('../../backend/firebase');
const { doc, getDoc } = require('firebase/firestore');
const UrlParser = require('../../routes/url-parse');
<<<<<<< HEAD
const likeButtonInitiator = require('../../utils/likeButtonInitiator');
=======
<<<<<<< HEAD
const likeButtonInitiator = require('../../utils/likeButtonInitiator');
=======
<<<<<<< HEAD
const likeButtonInitiator = require('../../utils/likeButtonInitiator');
=======
const likeButtonInitiator = require('../../utils/likeButtonInitiator')
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc

const Detail = {
  async render() {
    return `
      <div class="detailContainer "></div>
      <div class="likeContainer"></div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
      
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
    `;
  },

  async afterRender() {
    const container = document.querySelector('.detailContainer');
    const likeButton = document.querySelector('.likeContainer');
    
    const url = UrlParser.parseActiveUrlWithoutCombiner();
<<<<<<< HEAD
    const { type, id , newFeature} = url;
=======
<<<<<<< HEAD
    const { type, id , newFeature} = url;
=======
<<<<<<< HEAD
    const { type, id , newFeature} = url;
=======
    const { type, id } = url;
<<<<<<< HEAD
=======
    // console.log("Parsed URL Data:", url);
    // console.log("Type:", type, "ID:", id);
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735

>>>>>>> c94bcc7c924ad1ff3702658624d3457c4c01c32a
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
    if (!type || !id) {
      container.innerHTML = '<p>Error: Invalid URL parameters.</p>';
      return;
    }

    try {
      // Fetch data from Firestore
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const item = docSnap.data();
        container.innerHTML = createDetailTemplate(item, type);
        likeButton.innerHTML = createLikeButtonTemplate();
        likeButtonInitiator.init({
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
          button: document.querySelector('#likeButton'),
          item,
          type,
          newFeature
        });

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
          button : document.querySelector('.likeContainer'),
          item, 
          type,
        });
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
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
