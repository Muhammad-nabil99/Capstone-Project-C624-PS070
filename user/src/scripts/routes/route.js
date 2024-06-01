import Beranda from "../views/pages/beranda"
import Detail from "../views/pages/detail"
import Penghinapan from "../views/pages/penghinapan";
import Wisata from "../views/pages/wisata";
import Kuliner from "../views/pages/kuliner";

const routes = {
  '/': Beranda, // default page
  '/beranda': Beranda,
  '/penghinapan': Penghinapan,
  '/wisata':Wisata,
  '/kuliner':Kuliner,
  '/detail/:id': Detail
}

export default routes