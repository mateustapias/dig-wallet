import getCurrenciesfromAPI from '../../services/currenciesAPI';
import { User, Dispatch, Expense, Currencies } from '../../types';

export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const REQUEST_CURRENCIES_API = 'REQUEST_CURRENCIES_API';
export const GET_CURRENCIES_STARTED = 'GET_CURRENCIES_STARTED';
export const GET_CURRENCIES_FAILED = 'GET_CURRENCIES_FAILED';
export const GET_CURRENCIES_SUCCEED = 'GET_CURRENCIES_SUCCEED';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const actionUpdateUserDetails = (user: User) => ({
  type: UPDATE_USER_DETAILS,
  payload: {
    ...user,
  },
});

function actionGetCurrenciesStarted() {
  return { type: GET_CURRENCIES_STARTED };
}

function actionGetCurrenciesFailed(error: string) {
  return ({
    type: GET_CURRENCIES_FAILED,
    payload: { error },
  });
}

function actionGetCurrenciesSucceed(currencies: Currencies, firstTime = false) {
  return ({
    type: GET_CURRENCIES_SUCCEED,
    payload: {
      currencies,
    },
  });
}

export function actionFetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionGetCurrenciesStarted());
      const currencies = await getCurrenciesfromAPI('https://economia.awesomeapi.com.br/json/all');
      dispatch(actionGetCurrenciesSucceed(currencies));
    } catch (error: any) {
      dispatch(actionGetCurrenciesFailed('Erro na requisição da API.'));
    }
  };
}

export function actionAddExpense(expense: Expense) {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
    },
  };
}
