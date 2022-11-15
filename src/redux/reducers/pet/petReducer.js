import {PET_ACTIONS} from '../../actions/pet/petAction';

const {STORE_PET} = PET_ACTIONS;

const initialState = {pets: []};

const petReducer = (state = initialState, {type, payload}) => {
  const {pets} = state;

  switch (type) {
    case STORE_PET:
      const petsTmp = pets.filter(pet => payload.pet.id !== pet.id);
      petsTmp.push({...payload.pet});
      return {...state, pets: petsTmp};
  }
  return state;
};

export default petReducer;
