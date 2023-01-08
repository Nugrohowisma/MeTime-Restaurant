/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable codeceptjs/no-pause-in-scenario */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty liked restaurant', ({ I }) => {
  I.seeElement('#query');
  I.see('ups... data not found', '.list_item__not__found');
});

Scenario('likes a restaurant and cancels liking a restaurant', async ({ I }) => {
  I.see('ups... data not found', '.list_item__not__found');

  I.amOnPage('/');
  pause();

  I.seeElement('.title a');
  I.click(locate('.title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.data');

  I.seeElement('.title a');
  I.click(locate('.title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.data');
  I.see('ups... data not found', '.list_item__not__found');
});

Scenario('Searching restaurant', async ({ I }) => {
  I.see('ups... data not found', '.list_item__not__found');

  I.amOnPage('/');

  I.seeElement('.title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.item_title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('.data');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurant = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurant = await I.grabNumberOfVisibleElements('.list_item');
  assert.strictEqual(matchingRestaurant.length, visibleLikedRestaurant);

  matchingRestaurant.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.title a').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
