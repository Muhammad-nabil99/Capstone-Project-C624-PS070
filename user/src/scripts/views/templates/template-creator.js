const createServiceItemsTemplate = () => {
    return `
    <div class="container-option-items">
       <div class="item_option wisata">
           <button tabindex="0" arial-label="penghinapan">
               <img src="./public/images/wisata.jpeg" alt="wisata">
           </button>
           <span>wisata</span>
       </div>
       <div class="item_option wisata">
           <button tabindex="0" arial-label="penghinapan">
               <img src="./public/images/wisata.jpeg" alt="wisata">
           </button>
           <span>wisata</span>
       </div>
       <div class="item_option wisata">
           <button tabindex="0" arial-label="penghinapan">
               <img src="./public/images/wisata.jpeg" alt="wisata">
           </button>
           <span>wisata</span>
       </div>
   </div>
    `;
}

const createRecomendationsItemsTemplate = () => {
   return `
           <h1 tabindex="0" arial-label="rekomendasi destinasi">Rekomendasi Destinasi</h1>
            <div class="container-recomendation-items">
               <div class="item_recomendation">
                   <img src="" alt="title">
                   <button>title</button>
               </div>
               <div class="item_recomendation">
                   <img src="" alt="title">
                   <button>title</button>
               </div>
               <div class="item_recomendation">
                   <img src="" alt="title">
                   <button>title</button>
               </div>
               <div class="item_recomendation">
                   <img src="" alt="title">
                   <button>title</button>
               </div>
            </div>
   `;
}
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
  let extraDetail = '';
  if (type === 'wisata') {
    extraDetail = `<p class="ticket-price">Harga Tiket: ${item.price}</p>`;
  } else if (type === 'kuliner') {
    extraDetail = `<p class="openAt">Buka: ${item.openTime}</p>`;
  } else if (type === 'penginapan') {
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
     <img src="/public/images/heros/hero-image_3.jpg" alt="Hero Image">
   </div>
   `;
}

export { createHeaderHero, createDetailTemplate , createTemplateItems, createRecomendationsItemsTemplate, createServiceItemsTemplate }
