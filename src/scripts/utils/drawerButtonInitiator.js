const UrlParser = require("../routes/url-parse");

const DrawerButtonInitiator = {
  init({ nav, drawer, content }) {
    drawer.addEventListener("click", () => {
      this._open(nav);
    });
    content.addEventListener("click", () => {
      this._close(nav);
    });
    window.addEventListener("load", () => {
      const EVENT = "active";
      document.addEventListener(EVENT, () => {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        let target;
        if (url.resource === null) {
          target = document.querySelector(`a[href="#/beranda"]`);
        } else {
          target = document.querySelector(
            `a[href="#/${url.type || url.resource}"]`
          );
        }
        this._removeItemClass(nav.children[0].children);
        if(!target) return;
        target.classList.add("active");
      });
      document.dispatchEvent(new Event(EVENT));
    }),
      document.addEventListener("click", (e) => {
        const target = e.target.closest(".nav_link");
        if (!target) return;
        if (window.innerWidth > 734) {
          this._removeItemClass(nav.children[0].children);
          target.classList.add("active");
        } else {
          target.classList.add("active");
          this._afterClicked(nav);
        }
      });
  },
  _open(nav) {
    nav.classList.toggle("show");
  },
  _close(nav) {
    nav.classList.remove("show");
  },
  _afterClicked(navbar) {
    console.log('after click');
    [...navbar.children[0].children].forEach((element) => {
      element.addEventListener("click", (e) => {
        if (
          !e.target.parentElement.parentElement.parentElement.classList.contains(
            "show"
          )
        )
          return;
        this._removeItemClass(navbar.children[0].children);
        e.target.parentElement.parentElement.parentElement.classList.remove(
          "show"
        );
      });
    });
  },
  _removeItemClass(items) {
    [...items].forEach((item) => {
      item.children[0].classList.remove("active");
    });
  },
};
export default DrawerButtonInitiator;
