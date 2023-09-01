import getCurrenciesfromAPI from '../../services/currenciesAPI';
import { User, Dispatch, Expense } from '../../types';

export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const REQUEST_CURRENCIES_API = 'REQUEST_CURRENCIES_API';
export const GET_CURRENCIES_STARTED = 'GET_CURRENCIES_STARTED';
export const GET_CURRENCIES_FAILED = 'GET_CURRENCIES_FAILED';
export const GET_CURRENCIES_SUCCEED = 'GET_CURRENCIES_SUCCEED';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

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

function actionGetCurrenciesSucceed(currencyCodes: string[]) {
  return ({
    type: GET_CURRENCIES_SUCCEED,
    payload: {
      currencyCodes,
    },
  });
}

export function actionFetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actionGetCurrenciesStarted());
      const data = await getCurrenciesfromAPI('https://economia.awesomeapi.com.br/json/all');
      const currencyCodes = Object.keys(data);
      currencyCodes.splice(1, 1);
      dispatch(actionGetCurrenciesSucceed(currencyCodes));
    } catch (error: any) {
      dispatch(actionGetCurrenciesFailed('Erro na requisição da API.'));
    }
  };
}

export function actionUpdateExpenses(expense: Expense) {
  return {
    type: UPDATE_EXPENSES,
    payload: {
      expense,
    },
  };
}
