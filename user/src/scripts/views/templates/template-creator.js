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

const createTemplateItems = (item) => {
   return `
   <div class="detail-Container">
       <div class="image-item">
           <picture>
               <source>
               <img src="${item.imageUrl}" alt="${item.name}">
           </picture>
       </div>
       <div class="description-item">
           <div class="title-item">
               <a href="#/detail/${item.id}">${item.name}</a>
           </div>
           <div class="location">
               <i class="fa fa-location-dot" style="color: #000;"></i>
               <p>${item.location}</p>
           </div>
           <div class="description-item">
               <p>${item.detail}</p>
           </div>
       </div>
   </div>
   `;
}

// const createTemplateDetail = (detail) => {
//    return `
//    <div class="detail-container">
//        <div class="image-detail">
//            <picture>
//                <source>
//                <img src="${detail.imageUrl}" alt="${detail.name}">
//            </picture>
//            <h2>${detail.name}</h2>
//        </div>
//        <div class="description-detail">
//        ${detail.detail}
//        </div>
//        <div class="more-detail">
//            <div class="location-detail">
//                <h4>Lokasi:</h4>
//                <p class="locatedOn">${detail.location}</p>
//                <p class="openAt">Buka: ${detail.openTime}</p>
//                <p class="ticket-price">Harga Tiket: ${detail.price}</p>
//            </div> 
//            <button class="maps-detail">Maps</button>
//        </div>
//    </div>
//    `;
// }

const createWisataDetailTemplate = (detail) => `
  <div class="detail-container">
    <div class="image-detail">
      <picture>
        <source>
        <img src="${detail.imageurl}" alt="${detail.name}">
      </picture>
      <h2>${detail.name}</h2>
    </div>
    <div class="description-detail">
      ${detail.detail}
    </div>
    <div class="more-detail">
      <div class="location-detail">
        <h4>Location:</h4>
        <p class="locatedOn">${detail.location}</p>
        <p class="openAt">Open: ${detail.opentime}</p>
        <p class="ticket-price">Price: ${detail.price}</p>
      </div> 
      <a class="maps-detail" target="_blank" href="https://maps.google.com/?q=${encodeURIComponent(detail.location)}">
        Maps
      </a>
    </div>
  </div>
`;

const createKulinerDetailTemplate = (detail) => `
  <div class="detail-container">
    <div class="image-detail">
      <picture>
        <source>
        <img src="${detail.imageurl}" alt="${detail.name}">
      </picture>
      <h2>${detail.name}</h2>
    </div>
    <div class="description-detail">
      ${detail.detail}
    </div>
    <div class="more-detail">
      <div class="location-detail">
        <h4>Location:</h4>
        <p class="locatedOn">${detail.location}</p>
        <p class="openAt">Open: ${detail.opentime}</p>
      </div> 
      <a class="maps-detail" target="_blank" href="https://maps.google.com/?q=${encodeURIComponent(detail.location)}">
        Maps
      </a>
    </div>
  </div>
`;

const createPenginapanDetailTemplate = (detail) => `
  <div class="detail-container">
    <div class="image-detail">
      <picture>
        <source>
        <img src="${detail.imageurl}" alt="${detail.name}">
      </picture>
      <h2>${detail.name}</h2>
    </div>
    <div class="description-detail">
      ${detail.detail}
    </div>
    <div class="more-detail">
      <div class="location-detail">
        <h4>Location:</h4>
        <p class="locatedOn">${detail.location}</p>
        <p class="openAt">Open: ${detail.opentime}</p>
      </div> 
      <a class="maps-detail" target="_blank" href="https://maps.google.com/?q=${encodeURIComponent(detail.location)}">
        Maps
      </a>
    </div>
  </div>
`;

const createHeaderHero = () => {
   return `
   <div class="tagline_hero">
     <h2>Parawisata Kabupaten Pekalongan</h2>
     <p>Website parawisata Kabupaten Pekalongan</p>
     <img src="/public/images/heros/hero-image_3.jpg" alt="Hero Image">
   </div>
   `;
}

export { createHeaderHero,  createWisataDetailTemplate, createKulinerDetailTemplate, createPenginapanDetailTemplate , createTemplateItems, createRecomendationsItemsTemplate, createServiceItemsTemplate }
