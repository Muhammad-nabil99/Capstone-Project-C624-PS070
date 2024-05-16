  import '../styles/main.scss'
  // import '../styles/responsive.scss'
  import App from './views/app'

  const app = new App({
    button: document.querySelector('.menu-toggle'),
    drawer: document.querySelector('.navigation-menu'),
    content: document.querySelector('#maincontent')
  })
  window.addEventListener('hashchange', () => {
    app.renderPage()
  })

  window.addEventListener('load', () => {
    app.renderPage()
  })
