const createServiceItemsTemplate = () =>{
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
    `
}
const createRecomendationsItemsTemplate = () =>{
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
   `
}
const createTemplateItems = (item) =>{
   return `
   <div class="detail-Container">
       <div class="image-item">
           <picture>
               <source>
               <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="">
           </picture>
       </div>
       <div class="description-item">
           <div class="title-item">
               <a href="#/detail/:id">title</a>
           </div>
           <div class="description-item">
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatum velit fugit, animi provident ipsa accusamus molestiae dolorum nulla quo iure iste ipsam quis impedit commodi, necessitatibus quia totam? Quis.</p>
           </div>
       </div>
   </div>
   `
}
const createTemplateDetail = (detail) =>{
   return `
   <div class="detail-container">
       <div class="image-detail">
           <picture>
               <source>
               <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="">
           </picture>
           <h2>Title</h2>
       </div>
       <div class="description-detail">
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia dolorem animi at dolores, adipisci quidem repudiandae numquam cum voluptatum labore dolorum. Deserunt, temporibus? Voluptatibus suscipit sit doloribus optio minus eveniet pariatur deserunt aut modi tempore, hic porro perferendis inventore neque, in id, officia eius deleniti dignissimos expedita magni? Rerum fugiat eveniet nesciunt maxime cupiditate enim, culpa dignissimos similique iusto alias neque veniam natus necessitatibus itaque animi sint eum, tempore tenetur minus rem quisquam unde accusamus reprehenderit pariatur? Vero ipsum animi sit, labore quasi id, nobis a ullam non minima tenetur dolorem accusamus reiciendis quos perferendis, voluptatibus assumenda voluptatum ipsam praesentium?</p>
       </div>
       <div class="more-detail">
           <div class="location-detail">
               <h4>lokasi : </h4>
               <p class="locatedOn">pekalongan</p>
               <p class="openAt">Buka : 08.00 - 17.30 WIB</p>
               <p class="ticket-price">Harga Tiket : Rp.5.000</p>
           </div> 
           <button class="maps-detail">Maps</button>
       </div>
   </div>
   `;
}
const createHeaderHero = () =>{
   return `
   <div class="tagline_hero">
     <h2>Parawisata kabupaten pekalongan</h2>
     <p>website parawisata kabupaten pekalongan</p>
     <img src="/public/images/heros/hero-image_3.jpg">
   </div>
   

   `
}
export  {createHeaderHero,createTemplateDetail,createTemplateItems,createRecomendationsItemsTemplate,createServiceItemsTemplate}