import { createTemplateItems } from "../templates/template-creator";
const Penghinapan = {
    async render(){
        return `
            <h1 class="active penghinapanPage">Penghinapan</h1>
            <div class="penghinapanContainer"></div>
        `
    },
    async afterRender(){
        const container = document.querySelector('.penghinapanContainer')
        for(let i = 0; i <= 5; i++){
            container.innerHTML += createTemplateItems();
        };
        
    }
}
export default Penghinapan;