const createCaterogyItemsTemplate = () => {
  return `
    <div class="container-option-items">
      <div class="item_option">
        <button tabindex="0" arial-label="wisata's button">
          <a href="#/wisata">
            <img src="./images/wisata.jpeg" alt="wisata">
          </a>
        </button>
        <span>wisata</span>
      </div>
      <div class="item_option">
        <button tabindex="0" arial-label="kuliner's button">
          <a href="#/kuliner">
            <img src="./images/kuliner.jpeg" alt="kuliner">
          </a>
        </button>
        <span>kuliner</span>
      </div>
      <div class="item_option">
        <button tabindex="0" arial-label="penghinapan's button">
          <a href="#/penginapan">
            <img src="./images/penghinapan.jpeg" alt="penghinapan">
          </a>
        </button>
        <span>penghinapan</span>
      </div>
    </div>
  `;
};

const createRecomendationsItemsTemplate = (item) => {
<<<<<<< HEAD
  return `    
    <div class="item_recomendation" aria-label="recomendation">
=======
<<<<<<< HEAD
  return `    
    <div class="item_recomendation" aria-label="recomendation">
=======
<<<<<<< HEAD
  return `    
    <div class="item_recomendation" aria-label="recomendation">
=======
  return `
<<<<<<< HEAD
    <div class="item_recomendation">
>>>>>>> c94bcc7c924ad1ff3702658624d3457c4c01c32a
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
      <picture>
        <source>
          <img src="${item.imageUrl}" alt="${item.name}">
        </source>
      </picture>
      <h2 class="title"><a href="#/detail/${item.type}/${item.id}">${item.name}</a></h2>
      <div class="location">
        <i class="fa fa-location-dot" style="color: #00000;"></i>
        <p>${item.location}</p>
      </div>
    </div>
  `;
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
      <div class="item_recomendation">
      <picture>
          <source>
              <img src="./images/recomendasi/${item}.jpeg" alt="title">         
      </picture>
      <h2 class="title"><a href="#/detail/:id">Title</a></h2>
      <div class="location">
          <i class="fa fa-location-dot" style="color: #00000;"></i>
          <p>Jl. A. Yani No.44, Bener Dua, Bener, Kec. Wiradesa, Kabupaten Pekalongan, Jawa Tengah 51152</p>
      </div>
    </div>
   `;
};
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
const createTemplateItems = (item, type) => `
  <div class="detail-Container">
    <div class="image-item">
      <picture>
          <source>
          <img src="${item.imageUrl}" alt="${item.name} image">
      </picture>
    </div>
    <div class="description-item">
      <div class="title-item">
        <p tabindex="0" aria-label="${item.name}">${item.name}</p>
      </div>
      <div class="description-item">
        <p>${item.detail}</p><a href="#/detail/${type}/${item.id}" aria-label="Show More ${item.name} item">Show More</a>
      </div>
    </div>
  </div>
`;

const createDetailTemplate = (item, type) => {
  let extraDetail = "";
  if (type === "wisata") {
    extraDetail = `<p class="ticket-price" aria-label="ticket's price" tabindex="0">Harga Tiket: ${item.price}</p>`;
  } else if (type === "kuliner") {
    extraDetail = `<p aria-label="Open at" tabindex="0">Buka: ${item.openTime}</p>`;
  } else if (type === "penginapan") {
    extraDetail = `<p tabindex="0" aria-label="facility">Fasilitas: ${item.fasilitas}</p>`;
  }

  return `
    <div class="detail-container">
      <a href="#/${type}" class="arrow-left" aria-label="back to the previous page">
        <i class="fa fa-arrow-left"></i> Back
      </a>
      <div class="image-detail">
        <picture>
          <source>
          <img src="${item.imageUrl}" alt="${item.name}">
        </picture>
        <h2 tabindex="0" aria-label="${item.name}'s detail">${item.name}</h2>
      </div>
      <div class="more-detail">
        <div class="location-detail">
          <h4>Lokasi: </h4>
          <p class="locatedOn" tabindex="0" aria-label="located on">${item.location}</p>
          ${extraDetail}
        </div> 
        <button class="maps-detail" aria-label="see maps" tabindex="0">Maps</button>
      </div>
      <div class="description-detail">
        <p tabindex="0" aria-label="description text">${item.detail}</p>
      </div>
    </div>
  `;
};

const createHeaderHero = () => {
  return `
    <div class="tagline_hero">
      <h2>Parawisata Kabupaten Pekalongan</h2>
      <p>Website parawisata Kabupaten Pekalongan</p>
      <img src="./images/heros/hero.jpeg" alt="Hero Image">
    </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
  `;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this tour" id="likeButton" class="like" tabindex="0">
    <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this tour" id="likeButton" class="like" tabindex="1">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

module.exports = {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
   `;
};
const createLikeButtonTemplate = () => `
    <button aria-label="like this tour" id="likeButton" class="like">
        <i class="fa-regular fa-heart" aria-hidden="true"></i>
    </button>
    `;
const createLikedButtonTemplate = () => `
    <button aria-label="unlike this tour" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
    `;
export {
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createHeaderHero,
  createDetailTemplate,
  createTemplateItems,
  createRecomendationsItemsTemplate,
  createCaterogyItemsTemplate,
};
