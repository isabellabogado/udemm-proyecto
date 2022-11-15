const getAddresses = state => {
  return state.user.addresses;
};

const getAllAddresses = state => {
  //TODO CAMBIAR
  const addresses = getAddresses(state);
  return addresses;
};

const getActiveAddress = state => {
  //TODO CAMBIAR
  const addresses = getAddresses(state);
  const activeAddress = addresses.find(address => address.selected === 1);
  return activeAddress;
};

export { getAllAddresses, getActiveAddress };
