const createCaterogyItemsTemplate = () => {
  return `
    <div class="container-option-items">
      <div class="item_option">
        <button tabindex="0" arial-label="penghinapan">
          <a href="#/wisata">
            <img src="./images/wisata.jpeg" alt="wisata">
          </a>
        </button>
        <span>wisata</span>
      </div>
      <div class="item_option">
        <button tabindex="0" arial-label="kuliner">
          <a href="#/kuliner">
            <img src="./images/kuliner.jpeg" alt="kuliner">
          </a>
        </button>
        <span>kuliner</span>
      </div>
      <div class="item_option">
        <button tabindex="0" arial-label="penghinapan">
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
  return `
    <div class="item_recomendation">
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

const createTemplateItems = (item, type) => `
  <div class="detail-Container">
    <div class="image-item">
      <picture>
        <source>
        <img src="${item.imageUrl}" alt="${item.name}">
      </picture>
    </div>
    <div class="description-item">
      <div class="title-item">
        <a href="#/detail/${type}/${item.id}">${item.name}</a>
      </div>
      <div class="description-item">
        <p>${item.detail}</p>
      </div>
    </div>
  </div>
`;

const createDetailTemplate = (item, type) => {
  let extraDetail = "";
  if (type === "wisata") {
    extraDetail = `<p class="ticket-price">Harga Tiket: ${item.price}</p>`;
  } else if (type === "kuliner") {
    extraDetail = `<p class="openAt">Buka: ${item.openTime}</p>`;
  } else if (type === "penginapan") {
    extraDetail = `<p class="openAt">Fasilitas: ${item.fasilitas}</p>`;
  }

  return `
    <div class="detail-container">
      <div class="image-detail">
        <picture>
          <source>
          <img src="${item.imageUrl}" alt="${item.name}">
        </picture>
        <h2>${item.name}</h2>
      </div>
      <div class="description-detail">
        <p>${item.detail}</p>
      </div>
      <div class="more-detail">
        <div class="location-detail">
          <h4>Lokasi: </h4>
          <p class="locatedOn">${item.location}</p>
          ${extraDetail}
        </div> 
        <button class="maps-detail">Maps</button>
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

module.exports = {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createHeaderHero,
  createDetailTemplate,
  createTemplateItems,
  createRecomendationsItemsTemplate,
  createCaterogyItemsTemplate,
};
