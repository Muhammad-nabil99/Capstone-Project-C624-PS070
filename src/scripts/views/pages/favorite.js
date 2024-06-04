const { createTemplateItems } = require('../templates/template-creator');
const Favorite = {
  async render() {
    return `
            <div class="favoriteContainer"></div>
        `;
  },
  async afterRender() {
        const container = document.querySelector('.favoriteContainer');
        container.innerHTML += createTemplateItems('')
  },
};

export default Favorite;