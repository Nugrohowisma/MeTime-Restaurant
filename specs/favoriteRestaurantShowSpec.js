import FavoriteRestaurantSearchView from '../src/scripts/views/page/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/page/liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should ask for the favorite restaurant', () => {
      const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });

      expect(favoriteRestaurant.getAllData).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurant have been liked', (done) => {
      document.getElementById('data').addEventListener('data:updated', () => {
        expect(document.querySelectorAll('.list_item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurant.getAllData.and.returnValues([]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });

  describe('When favorite restaurant exist', () => {
    it('should show the restaurant', (done) => {
      document.getElementById('data').addEventListener('data:updated', () => {
        expect(document.querySelectorAll('.list_item').length).toEqual(2);
        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurant.getAllData.and.returnValues([
        {
          id: 11, name: 'A', vote_average: 3, overview: 'Sebuah restaurant A',
        },
        {
          id: 22, name: 'B', vote_average: 4, overview: 'Sebuah restaurant B',
        },
      ]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });
});
