import FavoriteRestaurantSearchPresenter from '../src/scripts/views/page/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/page/liked-restaurants/favorite-restaurant-search-view';

describe('Searching Restaurant Data', () => {
  let presenter;
  let favoriteRestaurant;
  let view;

  const searchData = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchData('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      searchData('restaurant a');
      expect(favoriteRestaurant.searchData).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurant', () => {
      presenter._showFoundRestaurant([{ id: 1 }]);
      expect(document.querySelectorAll('.list_item').length).toEqual(1);

      presenter._showFoundRestaurant([{
        id: 1,
        name: 'Satu',
      }, {
        id: 2,
        name: 'Dua',
      }]);
      expect(document.querySelectorAll('.list_item').length)
        .toEqual(2);
    });

    it('should show the name of the found restaurants', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        name: 'Satu',
      }]);
      expect(document.querySelectorAll('.name').item(0).textContent)
        .toEqual('Satu');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('data').addEventListener('data:updated', () => {
        const restauratName = document.querySelectorAll('.name');
        expect(restauratName.item(0).textContent).toEqual('-');
        done();
      });

      favoriteRestaurant.searchData.withArgs('restaurant a').and.returnValues([
        { id: 444 },
      ]);

      searchData('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchData(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchData('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchData('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchData('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchData('    ');

      expect(favoriteRestaurant.getAllData).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('data').addEventListener('data:updated', () => {
        expect(document.querySelectorAll('.list_item__not__found').length).toEqual(1);
        done();
      });

      favoriteRestaurant.searchData.withArgs('restaurant a').and.returnValues([]);

      searchData('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('data').addEventListener('data:updated', () => {
        expect(document.querySelectorAll('.list_item').length).toEqual(0);
        done();
      });

      favoriteRestaurant.searchData.withArgs('restaurant a')
        .and
        .returnValues([]);

      searchData('restaurant a');
    });
  });
});
