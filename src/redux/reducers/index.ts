// import user from './user';
// import wallet from './wallet';
import { combineReducers } from 'redux';
import { userReducer as user } from './user';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
