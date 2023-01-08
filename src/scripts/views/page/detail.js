import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createDetailTemplate } from '../template/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <div id="restData"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restData = await RestaurantDbSource.detailRestaurant(url.id);
    const restDataContainer = document.querySelector('#restData');
    restDataContainer.innerHTML += createDetailTemplate(restData);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restData: {
        id: restData.id,
        name: restData.name,
        pictureId: restData.pictureId,
        city: restData.city,
        rating: restData.rating,
      },
    });
  },
};

export default Detail;
