import Dashboard from '../views/pages/dashboard'
import Wisata from '../views/pages/wisata'
import Wisata_form from '../views/pages/form/wisata_form'
import Kuliner from '../views/pages/kuliner'
import Kuliner_form from '../views/pages/form/kuliner_form'

const routes = {
  '/': Dashboard, // default page
  '/home': Dashboard,
  '/wisata': Wisata,
  '/wisata_form' : Wisata_form,
  '/kuliner': Kuliner,
  '/kuliner_form' : Kuliner_form,
}

export default routes
