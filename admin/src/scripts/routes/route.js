import Dashboard from '../views/pages/dashboard';
import Wisata from '../views/pages/wisata/wisata';
import Wisata_form from '../views/pages/wisata/wisata_form';
import Wisata_form_edit from '../views/pages/wisata/wisata_form_edit';
import Kuliner from '../views/pages/kuliner/kuliner';
import Kuliner_form from '../views/pages/kuliner/kuliner_form';
import Kuliner_form_edit from '../views/pages/kuliner/kuliner_form_edit';
import Penginapan from '../views/pages/penginapan/penginapan'
import Penginapan_form from '../views/pages/penginapan/penginapan_form';
import Penginapan_form_edit from '../views/pages/penginapan/penginapan_form._edit';

const routes = {
  '/': Dashboard,
  '/home': Dashboard,
  '/wisata': Wisata,
  '/wisata_form': Wisata_form,
  '/wisata_form_edit/:id': Wisata_form_edit,
  '/kuliner': Kuliner,
  '/kuliner_form': Kuliner_form,
  '/kuliner_form_edit/:id': Kuliner_form_edit,
  '/penginapan': Penginapan,
  '/penginapan_form': Penginapan_form,
  '/penginapan_form_edit/:id' : Penginapan_form_edit
};

export default routes;
