const PET_ACTIONS = {
  GET_PET: 'GET_PET',
  STORE_PET: 'STORE_PET',
};

const storePet = pet => {
  return {type: PET_ACTIONS.STORE_PET, payload: {pet}};
};

export {storePet, PET_ACTIONS};
