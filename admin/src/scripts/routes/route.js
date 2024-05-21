import Dashboard from '../views/pages/dashboard';
import Wisata from '../views/pages/wisata/wisata';
import Wisata_form from '../views/pages/wisata/wisata_form';
import Wisata_form_edit from '../views/pages/wisata/wisata_form_edit';
import Kuliner from '../views/pages/kuliner/kuliner';
import Kuliner_form from '../views/pages/kuliner/kuliner_form';

const routes = {
  '/': Dashboard,
  '/home': Dashboard,
  '/wisata': Wisata,
  '/wisata_form': Wisata_form,
  '/wisata_form_edit/:id': Wisata_form_edit,
  '/kuliner': Kuliner,
  '/kuliner_form': Kuliner_form,
};

export default routes;
