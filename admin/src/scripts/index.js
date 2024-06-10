import '../styles/main.scss';
import '../styles/table.scss';
import '../styles/form.scss';
import '../styles/responsive.scss';
import App from './views/app';

const app = new App({
  button: document.querySelector('.menu-toggle'),
  drawer: document.querySelector('.navigation-menu'),
  content: document.querySelector('#maincontent')
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  }
});
