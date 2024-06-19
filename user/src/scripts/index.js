import "regenerator-runtime";
import "lazysizes";
import Aos from "aos";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "../styles/main.css";
import "../styles/responsive.css";
import App from "./views/app";
import swRegister from "./sw-register";
import { doc } from "firebase/firestore";


const app = new App({
  nav: document.querySelector("nav.drawer"),
  drawer: document.querySelector(".humberger"),
  content: document.querySelector("#maincontent"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});
window.addEventListener("load", async () => {
  app.renderPage();
  Aos.init();
  swRegister();
});


