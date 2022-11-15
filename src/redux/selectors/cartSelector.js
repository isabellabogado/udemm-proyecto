const getCart = state => {
  return state.cart;
};

const getCartInformation = state => {
  return getCart(state);
};

const getProductsInCart = state => {
  const { products } = getCart(state);
  return products;
};

const getCommerceInCart = state => {
  const { commerceId } = getCart(state);
  return commerceId;
};

export { getCartInformation, getProductsInCart, getCommerceInCart };
