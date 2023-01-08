import { createItemTemplate } from '../../template/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
       <div class="content">
       <h3 class="catalog">Explore Restaurant</h3>
       <div class="searchbar">
       <input id="query" class="search_input" type="text">   
       </div>
       <div class="data-content">
       <div class="list-content">
       <div class="list data" id="data"></div>
       </div>
       </div>
       </div>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(data) {
    this.showFavoriteRestaurant(data);
  }

  showFavoriteRestaurant(data = []) {
    let html;
    if (data.length) {
      html = data.reduce((carry, restData) => carry.concat(createItemTemplate(restData)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('data').innerHTML = html;

    document.getElementById('data').dispatchEvent(new Event('data:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="list_item__not__found data__not__found catalog">ups... data not found</div>';
  }
}

export default FavoriteRestaurantSearchView;
