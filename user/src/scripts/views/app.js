import DrawerButtonInitiator from '../utils/drawerButtonInitiator';
import UrlParser from '../routes/url-parse';
import routes from '../routes/route';
import { doc, documentId } from 'firebase/firestore';
const utils = require('../utils/utils')


class App {
  constructor({ nav, drawer, content }) {
    this._nav = nav;
    this._drawer = drawer;
    this._content = content;
    
    this._initialAppShell();
  }
  
  _initialAppShell() {
    DrawerButtonInitiator.init({
      nav : this._nav, 
      drawer : this._drawer,
      content : this._content
    })
  }

  async renderPage() {
    const spinner = document.querySelector('#maincontent');
    utils._showElement(spinner)
    const url = UrlParser.parseActiveUrlWithCombiner();
    let page = routes[url];
    
    if (!page) {
      // Handle dynamic routes
      const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
      if (parsedUrl.resource && parsedUrl.type && parsedUrl.id) {
        const dynamicUrl = `/${parsedUrl.resource}/:type/:id`;
        page = routes[dynamicUrl];
      }
    }


    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
      document.addEventListener('click', utils._activeNavbar)
    } else {
      this._content.innerHTML = '<p>Page not found!</p>';
    }
    
    
   
  }
}

export default App;
