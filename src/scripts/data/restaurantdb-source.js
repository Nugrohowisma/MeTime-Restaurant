import API_ENDPOINT from '../global/api-endpoint';

class RestaurantDbSource {
  static async dataRestaurant() {
    const response = await fetch(API_ENDPOINT.RESTAURANT_DATA);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    // return response.json();
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default RestaurantDbSource;
