import { AnyAction } from 'redux';
import { UPDATE_USER_DETAILS } from '../actions';

export const USER_INITIAL_STATE = {
  email: '',
  password: '',
};

export function userReducer(state = USER_INITIAL_STATE, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_DETAILS:
      return ({
        ...state,
        ...payload,
      });
    default:
      return state;
  }
}
