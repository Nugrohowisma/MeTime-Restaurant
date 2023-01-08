class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchData(latestQuery);
    });
  }

  async _searchData(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurant;
    if (this.latestQuery.length > 0) {
      foundRestaurant = await this._favoriteRestaurant.searchData(this.latestQuery);
    } else {
      foundRestaurant = await this._favoriteRestaurant.getAllData();
    }

    this._showFoundRestaurant(foundRestaurant);
  }

  _showFoundRestaurant(data) {
    this._view.showFavoriteRestaurant(data);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
