import {combineReducers} from 'redux';
import petReducer from './pet/petReducer';
import userReducer from './user/userReducer';

export default combineReducers({user: userReducer, pets: petReducer});
