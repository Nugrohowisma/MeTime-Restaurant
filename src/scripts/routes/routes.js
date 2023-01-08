import ListRestaurant from '../views/page/list-restaurant';
import Detail from '../views/page/detail';
import Favorite from '../views/page/favorite';

const routes = {
  '/': ListRestaurant,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
