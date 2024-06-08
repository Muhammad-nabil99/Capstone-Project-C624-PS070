import DrawerButtonInitiator from '../utils/drawerButtonInitiator';
import UrlParser from '../routes/url-parse';
import routes from '../routes/route';
import { doc } from 'firebase/firestore';

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
    const url = UrlParser.parseActiveUrlWithCombiner();
    // console.log("Parsed URL:", url);

    let page = routes[url];

    if (!page) {
      // Handle dynamic routes
      const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
      if (parsedUrl.resource && parsedUrl.type && parsedUrl.id) {
        const dynamicUrl = `/${parsedUrl.resource}/:type/:id`;
        page = routes[dynamicUrl];
      }
    }

    // console.log("Page:", page);

    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      this._content.innerHTML = '<p>Page not found!</p>';
    }
   
   
  }
}

export default App;
