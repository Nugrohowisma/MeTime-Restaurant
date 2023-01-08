import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getData(id) {
    if (!id) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllData() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putData(restData) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restData.hasOwnProperty('id')) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return (await dbPromise).put(OBJECT_STORE_NAME, restData);
  },
  async deleteData(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  // eslint-disable-next-line no-empty-function, no-unused-vars
  async searchData(query) {
    return (await this.getAllData()).filter((restData) => {
      const loweredCaseRestaurantName = (restData.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};

export default FavoriteRestaurantIdb;
