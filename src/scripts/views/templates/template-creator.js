const createCaterogyItemsTemplate = () => {
  return `
    <div class="container-option-items">
       <div class="item_option wisata">
           <button tabindex="0" arial-label="penghinapan">
               <img src="./images/wisata.jpeg" alt="wisata">
           </button>
           <span>wisata</span>
       </div>
       <div class="item_option kuliner">
           <button tabindex="0" arial-label="penghinapan">
               <img src="./images/kuliner.jpeg" alt="kuliner">
           </button>
           <span>kuliner</span>
       </div>
       <div class="item_option penghinapan">
           <button tabindex="0" arial-label="penghinapan">
               <img src="./images/penghinapan.jpeg" alt="penghinapan">
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
export {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createHeaderHero,
  createDetailTemplate,
  createTemplateItems,
  createRecomendationsItemsTemplate,
  createCaterogyItemsTemplate,
};
