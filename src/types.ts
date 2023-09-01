import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type User = {
  email: string,
  password: string,
};

export type Currency = {
  currency: string
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  create_date: string,
};

export type Currencies = {
  [currency: string]: Currency,
};

export type Expense = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: Currencies,
};

export type RootState = {
  user: {
    email: string | undefined,
    password: string | undefined
  },
  wallet: {
    currencies: string[],
    expenses: Expense[],
    exchangeRates: Currencies
  }
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;
