import Dashboard from '../views/pages/dashboard'
import Wisata from '../views/pages/wisata'
import Wisata_form from '../views/pages/wisata_form'
// import Detail from '../views/pages/detail'

const routes = {
  '/': Dashboard, // default page
  '/home': Dashboard,
  '/wisata': Wisata,
  '/wisata_form' : Wisata_form, 
  // '/detail/:id': Detail
}


export default routes
