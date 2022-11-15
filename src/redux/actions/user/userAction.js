const USER_ACTIONS = {
  STORE_USER: 'STORE_USER',
};

const storeUser = user => {
  return {type: USER_ACTIONS.STORE_USER, payload: {user}};
};

export {storeUser, USER_ACTIONS};
