const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putData({ id: 1 });
    favoriteRestaurant.putData({ id: 2 });

    expect(await favoriteRestaurant.getData(1))
      .toEqual({ id: 1 });
    expect(await favoriteRestaurant.getData(2))
      .toEqual({ id: 2 });
    expect(await favoriteRestaurant.getData(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurant.putData({ aProperty: 'property' });

    expect(await favoriteRestaurant.getAllData())
      .toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteRestaurant.putData({ id: 1 });
    favoriteRestaurant.putData({ id: 2 });

    expect(await favoriteRestaurant.getAllData())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteRestaurant.putData({ id: 1 });
    favoriteRestaurant.putData({ id: 2 });
    favoriteRestaurant.putData({ id: 3 });

    await favoriteRestaurant.deleteData(1);

    expect(await favoriteRestaurant.getAllData())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteRestaurant.putData({ id: 1 });
    favoriteRestaurant.putData({ id: 2 });
    favoriteRestaurant.putData({ id: 3 });

    await favoriteRestaurant.deleteData(4);

    expect(await favoriteRestaurant.getAllData())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteRestaurant.putData({ id: 1, name: 'restaurant a' });
    favoriteRestaurant.putData({ id: 2, name: 'restaurant b' });
    favoriteRestaurant.putData({ id: 3, name: 'restaurant abc' });
    favoriteRestaurant.putData({ id: 4, name: 'ini mah restaurant abcd' });

    expect(await favoriteRestaurant.searchData('restaurant a')).toEqual([
      { id: 1, name: 'restaurant a' },
      { id: 3, name: 'restaurant abc' },
      { id: 4, name: 'ini mah restaurant abcd' },
    ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
