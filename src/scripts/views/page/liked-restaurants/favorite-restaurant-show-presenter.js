class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    const data = await this._favoriteRestaurant.getAllData();
    this._displayRestaurant(data);
  }

  _displayRestaurant(data) {
    this._view.showFavoriteRestaurant(data);
  }
}

export default FavoriteRestaurantShowPresenter;
