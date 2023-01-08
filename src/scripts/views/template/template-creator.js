import CONFIG from '../../global/config';

const createItemTemplate = (restData) => `
<div class="list_item" id=${restData.id}>
  <div class="city">${restData.city || '-'}</div>
    <p class="rate-text">
      <span class="rate">⭐ ${restData.rating || '-'}</span>
    </p>
    <picture>
        <source type="image/webp" data-srcset="${
  CONFIG.IMAGE_S + restData.pictureId
}" media="all and (max-width: 600px)">
        <source type="image/jpeg" data-srcset="${
  CONFIG.IMAGE_M + restData.pictureId
}" media="all and (min-width: 601px)">
        <img class="lazyload img" data-src="${
  CONFIG.IMAGE_L + restData.pictureId
}" alt="${restData.name || '-'}">
  </picture>
  <div class="content">
    <h3 class="title"><a href="/#/detail/${restData.id}" class="name">${
  restData.name || '-'
}</a></h3> 
  </div>
</div>
  `;

const createDetailTemplate = (restData) => `
<div class="list_item_detail">
<div class="list_item_description">
  <h4 class="item_title">${restData.name || '-'}</h4>
  <p class="rate-text">
  <span class="rate">⭐ ${restData.rating || '-'}</span>
</p>
<picture>
        <source type="image/jpeg" data-srcset="${
  CONFIG.IMAGE_S + restData.pictureId
}" media="all and (max-width: 400px)">
        <img class="lazyload img_detail" data-src="${
  CONFIG.IMAGE_M + restData.pictureId
}" alt="${restData.name || '-'}">
  </picture> 
</div>

<div class="list_item_description">
  <h4 class="item_title">Location</h4>
<p class="description">Address : ${restData.address || '-'}</p>
<p class="description">City : ${restData.city || '-'}</p>

</div>

<div class="list_item_description">
<h4 class="item_title">Menu</h4>
  <h5>Food :</h5>
<div class="description">
    ${restData.menus.foods.map((food) => `<span>${food.name || '-'}</span>`)}
</div>
  <h5>Drink :</h5>
<div class="description">
  ${restData.menus.drinks.map((drink) => `<span>${drink.name || '-'}</span>`)}
</div>
</div>

<div class="list_item_description">
<h4 class="item_title">Description</h4>
  <p class="description">${restData.description || '-'}</p>
</div>
</div>

<div class="list_item_detail">
  <h4 class="item_title">Review</h4>
<div>
      ${restData.customerReviews
    .map(
      (review) => `
      <div class="list_item_review">
      <div class="reviewer_name"><span>${review.name || '-'}</span>- ${
  review.date || '-'
}</div>
      <p class="reviewer_description">${review.review || '-'}</p>
      </div>
      `,
    )
    .join('')}
</div>
</div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this data" id="likeButton" class="like">
  &#9829;
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this data" id="likeButton" class="like">
  &#10006;
  </button>
`;

export {
  createItemTemplate,
  createDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
