
const createOurFeatureTemplate = (data) => {
  return `
       <div class="ourFeature ourFeatureItem"  data-aos="fade-up">
          <div class="icon_feature">
            <i class="fa-${data.typeIcon1} fa-${data.typeIcon2}" style="color: #e2d411;"></i>
          </div>
          <div class="description">
            <h2 tabindex="0" aria-label="${data.title}">${data.title}</h2>
            <P>${data.content}</P>
          </div>
      </div> 
  `;
};
const createCardAboutUs = (data) =>{
  return `
    <div class="cards" data-aos="fade-up">
      <div class="image-person">
        <img src="${data.img}" alt="">
      </div>
      <h2 class="name-person">${data.name}</h2>
      <p class="role-person">${data.role}</p>
      <div class="social-media">
        <div class="linked-in media">
          <a href="${data.linkedIn}" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div class="github media">
          <a href="${data.gitHub}" target="_blank">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>

  `
}

const createTaglineAboutUs = () =>{
  return `
          <h2 class="tagline-title">Trakel</h2>
         <p class="tagline-about">Kami adalah tim pengembang berdedikasi yang berkomitmen untuk memperkenalkan keindahan dan kekayaan budaya Pekalongan kepada dunia. Jelajahi destinasi menakjubkan bersama kami.</p>
  `
}
createDestinationsHeroTemplate = () =>{
  return `
  <div class="DestinationsHero">
      <div class="DestinationsHero-image">
          <img src="./images/penghinapan/map.png" alt="">
          <div class="tagline">
            <h1 tabindex="0" aria-label="Tagline destinations">Find Your Best Place</h1>
            <p>Temukan Destinasi Impian Anda dan Mulai Petualangan Tak Terlupakan Bersama Kami.</p>
          </div>
      </div>
        <div class="search-item">
            <div class="Search-container">
                <form action="" aria-label="Search">
                  <div class="search-box">
                    <input type="text" class="search__input" placeholder="Search" tabindex="0" aria-label="search item">
                    <button class="remove_button" aria-label="remove text at input field">
                        <i class="fa-regular fa-circle-xmark"  style="color: #63E6BE"></i> 
                    </button>
                  </div>
                </form>
            </div>
            <div class="button_input">
                  <div class="dropdown">
                      <button class="dropbtn">Destinations</button>
                      <div id="myDropdown" class="dropdown-content">
                          <a href="#/penginapan" class="nav_link">Penghinapan</a>
                          <a href="#/kuliner" class="nav_link">Kuliner</a>
                          <a href="#/wisata" class="nav_link">Wisata</a>
                      </div>
                  </div>
            </div>
        </div>
    </div>
  `;
}
const createWhatWeOfferTemplate = () =>{
  return `
  <h1 tabindex="0" aria-label="what we offer" class="section-title">What We Offer?</h1>
      <div class="whatWeOffer" data-aos="fade-up">
        <div class="image-whatWeOffer">
          <img src="./images/penghinapan/coffe.jpeg" alt="">
        </div>
        <div class="howMuchTheDestionationsAre">
          <div class="itemDestination penghinapan">
            <h2 id="1">0</h2>
            <h5 tabindex="0" aria-label="lebih dari 10 penghinapan">Penghinapan</h5>
          </div>
          <div class="itemDestination Wisata">
            <h2 id="2">0</h2>
            <h5 tabindex="0" aria-label="lebih dari 10 wisata">Wisata</h5>
          </div>
          <div class="itemDestination Kuliner">
            <h2 id="3">0</h2>
            <h5 tabindex="0" aria-label="lebih dari 10 kuliner">Kuliner</h5>
          </div>
        </div>
    </div>
  `
}
const createTemplateItems = (item, type) => {
  let price;
    if(type === 'penginapan'){
      price = `<a href="${item.price}" target="_blank" class="price" aria-label="price">Price by Traveloka</a>`
  }
  
  return `
  <div class="item-Container"  data-aos="fade-up">
    <a href="#/detail/${item.type || type}/${item.id}" aria-label="click anything on this item to show more about ${item.name} item">
      <div class="image-item">
        <div class="item-location">${item.location.split(',')[2]}</div>
        <picture tabindex="0" aria-label="picture of ${item.name}">
          <source class="lazyload" type="image/webp" media="(max-width: 600px)" srcset="${item.imageUrl}">
          <source class="lazyload" type="image/jpeg" media="(max-width: 600px)" srcset="${item.imageUrl}">
          <img class="lazyload" data-src ="${item.imageUrl}" alt="${item.name}">
        </picture>
      </div>
      <div class="description-item">
        <div class="title-item">
          <p tabindex="0" aria-label="title item">${item.name}</p>
          ${price || ''}
        </div>
      </div>
    </a>
  </div>
`;
}

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
            <source class="lazyload" type="image/webp" media="(max-width: 600px)" srcset="${item.imageUrl}">
            <source class="lazyload" type="image/jpeg" media="(max-width: 600px)" srcset="${item.imageUrl}">
            <img class="lazyload" data-src ="${item.imageUrl}" alt="${item.name}" >
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
    <div class="tagline_hero" data-aos="fade-left">
      <h1 tabindex="0" aria-label="Tagline">Discover Your Own <span class="Spesific-style">Destinations</span></h1>
      <h4>Website parawisata Kabupaten Pekalongan</h4>
      <p tabindex="0" aria-label="deskripsi">
      Kabupaten Pekalongan di Jawa Tengah, yang berbatasan dengan Laut Jawa, menawarkan pesona wisata unik. Terkenal dengan batik dan tradisi budayanya, daerah ini memiliki 43 kecamatan dengan kuliner khas seperti Nasi Megono dan Tauto. Wisata alamnya mencakup Curug Bajing dan Blackcanyon. Pekalongan adalah perpaduan budaya, kuliner, dan alam yang menarik untuk dijelajahi.</p>
      <a class="explore-btn" href="#/penginapan" aria-label="go to destinations page">Explore</a>
    </div>
    <img src="./images/heros/destinations.png" alt="hero image" data-aos="fade-right">
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

const createFooterTemplate = () =>{
  return `
          <div class="desriptions-footer">
        <div class="navbar-footer">
          <div class="nav-icons">
            <h2>Navigation</h2>
            <i class="fa-solid fa-paper-plane" style="color: white;"></i>
          </div>
          <nav class="list-nav-item">
                <a href="#/beranda" class="nav_link" name="beranda" tabindex="0" aria-label="Beranda">Beranda</a>
                <a href="#/penginapan" class="nav_link" name="destinations" tabindex="0" aria-label="destinations">Destinations</a>
                <a href="#/favorite" class="nav_link" name="favorite" tabindex="0" aria-label="favorite">Favorite</a>
                <a href="#/about" class="nav_link" name="about" tabindex="0" aria-label="favorite">About</a>
            
          </nav>
        </div>
          <div class="our-teams-footer">
            <div class="teams-icon">
              <h2>Our teams</h2>
              <i class="fa-solid fa-people-group" style="color: white;"></i>
            </div>
            <a href="https://www.linkedin.com/in/dafa-rizqi-pratama-984509225" class="member1" target="_blank">Dafa Rizqi Pratama</a>
            <a href="https://www.linkedin.com/in/muhammad-nabil-3960382b2/" target="_blank" class="member2">Muhammad Nabil</a>
            <a href="http://www.linkedin.com/in/stanly-winata-27452730a/" target="_blank" class="member3">Stanly Winata</a>
          </div>
          
          <div class="help-footer">
            <div class="logo-footer">
              <img src="./images/logo.png" alt="logo">
              <h2>Trakel</h2>
            </div>
            <div class="number-footer">
              <p class="number">+6281232340</p>
            </div>
            <div class="help-footer">
              <p class="number">@helpTrakel.com</p>
            </div>
          </div>
      </div> 
      <hr>
      <p>Copyright &copy;  2024 Trakel. All rights reserved</p>
  
  `
}
module.exports = {
  createFooterTemplate,
  createCardAboutUs,
createTaglineAboutUs,
  createDestinationsHeroTemplate,
  createOurFeatureTemplate,
  createWhatWeOfferTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createHeaderHero,
  createDetailTemplate,
  createTemplateItems,
};
