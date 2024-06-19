const {
  createTemplateItems,
} = require("../views/templates/template-creator");

const utils = {
  async initialize(data) {
    return this._checkData(data);
  },
  async _checkData(data) {
    return data.length === 0 || data.length === -1;
  },
  async formInput({ container, form, input, collectionData,typeData }) {
    form.addEventListener("input", async (e) => {
      e.preventDefault();
      const items = await utils.searchBar({ input, collectionData });
      if (items.length === 0)
        return (container.innerHTML = "<h2>Sorry! Items Not Found</h2>");
      container.innerHTML = "";
      
      items.forEach((item) => {
        container.innerHTML += createTemplateItems(item, typeData);
      });
    });
  },
  async searchBar({ input, collectionData }) {
    const query = input.value;
    if (query) {
      return utils._performSearch({ query, collectionData });
    }
    return collectionData;
  },
  _performSearch({ query, collectionData }) {
    return collectionData.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  },
  _removeTextField({removeFieldButton,input,collectionData,container,typeData}){
    removeFieldButton.addEventListener('click', (e) =>{
      e.preventDefault()
      input.value = '';
      container.innerHTML = '';
      collectionData.forEach((item) => {
        container.innerHTML += createTemplateItems(item, typeData);
      });
    })
  },
  _stickyNavbar({header,hero}){
      const navHeight = header.getBoundingClientRect().height;
      function stickyNav(entries){
          const [entry] = entries;
          if(!entry.isIntersecting) {
            header.classList.add('sticky')
            header.classList.add('animation')
          }else{
            header.classList.remove('sticky')
            header.classList.remove('animation')
          }
      }
      const headerObserver = new IntersectionObserver(stickyNav,{
          root : null,
          threshold : 0.25,
          rootMargin : `${navHeight}px`
      })
      headerObserver.observe(hero)
  },
  _dropDownChange(dropbtn){
    function myFunction(e) {
      e.preventDefault()
      document.getElementById("myDropdown").classList.toggle("show");
    }
    dropbtn.addEventListener('click', myFunction);
    window.addEventListener('click', (event) => {
      if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (const openDropdown of dropdowns) {
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    });
  },
  _showItemsDestinations({container,collectionData,typeData}){
    container.innerHTML = '';
    collectionData.forEach( (item) => {
      container.innerHTML += createTemplateItems(item,typeData);
    });
  },
  _activeNavbar(e){
    const target = e.target.closest('.list-nav-item');
    if(target){
      const attributeTarget = e.target.getAttribute('name');
      const navbarTarget = document.querySelector(`a[name="${attributeTarget}"]`).closest('.nav_item').children[0];
      navbarTarget.classList.add('active')
    }
  },
  _btnExploreToDestinations(buttonExplore){
    if(!buttonExplore) return;
    buttonExplore.addEventListener('click', () =>{
      const destinations = document.querySelector(`a[name="destinations"]`).closest('.nav_item').children[0];
      document.querySelector(`a[href="${window.location.hash}"]`).classList.remove('active')
      destinations.classList.add('active')
    })

  },
  _scrollToTop(){
    const allLink = document.querySelectorAll('.nav_link');
    [...allLink].forEach(link =>{
      link.addEventListener('click', () =>{
        this._removeActiveClass(allLink);
        link.classList.add('active');
        window.scrollTo(0,0);
      })
    })
  },
  _removeActiveClass(items) {
    [...items].forEach((item) => {
      item.classList.remove("active");
    });
  },
};

module.exports = utils;
