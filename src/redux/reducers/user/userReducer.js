import {USER_ACTIONS} from '../../actions/user/userAction';

const {STORE_USER} = USER_ACTIONS;

const initialState = {user: {}};

const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case STORE_USER:
      return {...payload.user, pwd: undefined};
  }
  return state;
};

export default userReducer;
