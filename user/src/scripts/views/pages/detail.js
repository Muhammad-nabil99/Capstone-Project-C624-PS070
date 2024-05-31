import { createTemplateDetail } from "../templates/template-creator";

const Detail = {
    async render(){
        return `
            <h1>Detail</h1>
            <div class="detailContainer"></div>
        `
    },
    async afterRender(){
        const container = document.querySelector('.detailContainer');
        container.innerHTML = createTemplateDetail();
    }
}
export default Detail;