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
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = routes[url]
    console.log(page)
    this._content.innerHTML = await page.render()
    await page.afterRender()
    this._content.addEventListener('click', (event) => {
      event.preventDefault()
    })
  }
}
export default App
