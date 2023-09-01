import { combineReducers } from 'redux';
import { walletReducer as wallet } from './wallet';
import { userReducer as user } from './user';

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;
