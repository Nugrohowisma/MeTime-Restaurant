import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/template/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurant, restData }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restData = restData;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restData;

    if (await this._isrestDataExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isrestDataExist(id) {
    const restData = await this._favoriteRestaurant.getData(id);
    return !!restData;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putData(this._restData);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteData(this._restData.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
