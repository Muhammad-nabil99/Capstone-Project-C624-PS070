import Beranda from "../views/pages/beranda";
import Detail from "../views/pages/detail";
import Penghinapan from "../views/pages/penghinapan";
import Wisata from "../views/pages/Wisata";
import Kuliner from "../views/pages/kuliner";
import MapPage from "../views/pages/map";
const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/penghinapan': Penghinapan,
  '/wisata': Wisata,
  '/kuliner': Kuliner,
  '/detail/:type/:id': Detail,
  '/map/:type/:id': MapPage,
};

export default routes;
