import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const favoriteRestaurantArray = {

  getData(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurant.find((restData) => restData.id === id);
  },

  getAllData() {
    return favoriteRestaurant;
  },

  putData(restData) {
    if (!restData.hasOwnProperty('id')) {
      return;
    }

    if (this.getData(restData.id)) {
      return;
    }

    favoriteRestaurant.push(restData);
  },

  deleteData(id) {
    favoriteRestaurant = favoriteRestaurant.filter((restData) => restData.id !== id);
  },

  searchData(query) {
    return this.getAllData()
      .filter((restData) => {
        const loweredCaseRestaurantName = (restData.name || '-').toLowerCase();
        const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantName.indexOf(jammedQuery) !== -1;
      });
  },

};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurant = []);

  itActsAsFavoriteRestaurantModel(favoriteRestaurantArray);
});
