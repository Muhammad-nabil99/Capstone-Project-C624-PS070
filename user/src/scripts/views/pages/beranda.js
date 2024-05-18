import {createRecomendationsItemsTemplate,createServiceItemsTemplate} from "../templates/template-creator";

const Beranda = {
    async render(){
        return `
            <div class="options"></div>
            <div class="recomendations"></div>
        `
    },
    async afterRender(){
        const options = document.querySelector('.options'); 
        const recomendations = document.querySelector('.recomendations')
        options.innerHTML = createServiceItemsTemplate();
        recomendations.innerHTML = createRecomendationsItemsTemplate()
    }
}

export default Beranda