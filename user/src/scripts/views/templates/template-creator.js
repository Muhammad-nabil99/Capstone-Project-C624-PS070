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
            </div>
   `
}

export  {createRecomendationsItemsTemplate,createServiceItemsTemplate}