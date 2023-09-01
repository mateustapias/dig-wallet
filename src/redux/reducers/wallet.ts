import { AnyAction } from 'redux';
import { GET_CURRENCIES_SUCCEED, ADD_EXPENSE } from '../actions';

export const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: null,
  // editor: false,
  // idToEdit: 0,
};

export function walletReducer(state = WALLET_INITIAL_STATE, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENCIES_SUCCEED:
      return {
        // ...state,
        // currencies: payload.currencies,
        ...state,
        exchangeRates: action.payload.currencies,
        currencies: action.payload && Object.keys(action.payload.currencies)
          .filter((currency) => currency !== 'USDT'),
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, payload.expense],
      };
    default:
      return state;
  }
}
