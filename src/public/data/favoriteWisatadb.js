import { openDB } from 'idb';
import CONFIG from '../../scripts/globals/config';
 
const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});
 
const FavoriteTourDB = {
  async getTour(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllTours() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putTour(item) {
    return (await dbPromise).put(OBJECT_STORE_NAME, item);
  },
  async deleteTour(item) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, item);
  },
};
 
export default FavoriteTourDB;