import { AnyAction } from 'redux';
import { GET_CURRENCIES_SUCCEED, UPDATE_EXPENSES } from '../actions';

export const WALLET_INITIAL_STATE = {

};

export function walletReducer(state = WALLET_INITIAL_STATE, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENCIES_SUCCEED:
      return {
        ...state,
        currencies: payload.currencyCodes,
      };
    case UPDATE_EXPENSES:
      return {
        ...state,
        expenses: [payload.expense],
      };
    default:
      return state;
  }
}
