import Beranda from "../views/pages/beranda";
import Detail from "../views/pages/detail";
import Penghinapan from "../views/pages/penghinapan";
import Wisata from "../views/pages/Wisata";
import Kuliner from "../views/pages/kuliner";

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/penghinapan': Penghinapan,
  '/wisata': Wisata,
  '/kuliner': Kuliner,
  '/detail/:type/:id': Detail,
};

export default routes;
