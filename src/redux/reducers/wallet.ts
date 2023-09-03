import { AnyAction } from 'redux';
import { GET_CURRENCIES_SUCCEED, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

export const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: null,
};

export function walletReducer(state = WALLET_INITIAL_STATE, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURRENCIES_SUCCEED:
      return {
        ...state,
        exchangeRates: payload.currencies,
        currencies: payload && Object.keys(payload.currencies)
          .filter((currency) => currency !== 'USDT'),
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, payload.expense],
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: [...payload.expenses],
      };
    default:
      return state;
  }
}
