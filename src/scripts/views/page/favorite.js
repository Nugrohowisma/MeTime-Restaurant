import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
  },
};

// const Favorite = {
//   async render() {
//     return `
//     <h3 class="catalog">Explore Restaurant</h3>
//     <div class="data-content">
//       <div class="list-content">
//       <div class="list" id="data"></div>
//       </div>
//     </div>
//     `;
//   },

//   async afterRender() {
//     const data = await FavoriteRestaurantIdb.getAllData();
//     const dataContainer = document.querySelector('#data');
//     data.forEach((restData) => {
//       dataContainer.innerHTML += createItemTemplate(restData);
//     });
//   },
// };

export default Favorite;
