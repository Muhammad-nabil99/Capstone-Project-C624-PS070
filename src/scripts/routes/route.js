import Beranda from "../views/pages/beranda";
import Detail from "../views/pages/detail";
import Destinations from "../views/pages/destinations";
import About from "../views/pages/about";
import MapPage from "../views/pages/map";
import Favorite from "../views/pages/favorite";

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/penginapan': Destinations,
  '/wisata': Destinations,
  '/kuliner': Destinations,
  '/favorite' : Favorite,
  '/about' : About,
  '/detail/:type/:id': Detail,
  '/map/:type/:id': MapPage,
};

export default routes;
