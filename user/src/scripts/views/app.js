// import DrawerInitiator from '../utils/drawer-inisiator'
import UrlParser from '../routes/url-parse'
import routes from '../routes/route'
class App {
  constructor ({ button, drawer, content }) {
    this._button = button
    this._drawer = drawer
    this._content = content

    this._initialAppShell()
  }

  _initialAppShell () {

  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);
    const page = routes[url];
    console.log(page);
    this._content.innerHTML = await page.render();
    await page.afterRender()
    // const skipLinkElem = document.querySelector('.skip-link')
    // skipLinkElem.addEventListener('click', (event) => {
    //   event.preventDefault()
    //   document.querySelector('#maincontent').focus()
    // })
  }
}
export default App
