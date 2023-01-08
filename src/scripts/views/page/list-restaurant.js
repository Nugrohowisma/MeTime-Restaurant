import RestaurantDbSource from '../../data/restaurantdb-source';
import { createItemTemplate } from '../template/template-creator';

const ListRestaurant = {
  async render() {
    return `
    <div class="hero-banner">
    <div class="explore">
      <h2>
        Looking for a place to eat? We will give you a good place
        recommendation
      </h2>
      <button class="btn" onclick="window.location.href='#catalog'">
        Explore
      </button>
    </div>
  </div>
  <h3 class="catalog">Explore Restaurant</h3>
  <div class="data-content" id="catalog">
    <div class="list-content">
    <div class="list" id="data"></div>
    </div>
  </div>
    `;
  },

  async afterRender() {
    const data = await RestaurantDbSource.dataRestaurant();
    const dataContainer = document.querySelector('#data');
    data.forEach((restData) => {
      dataContainer.innerHTML += createItemTemplate(restData);
    });
  },
};

export default ListRestaurant;
