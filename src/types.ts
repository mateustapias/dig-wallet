import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

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

export type User = {
  email: string,
  password: string,
};

type Currency = {
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
  USD: Currency,
  CAD: Currency,
  GBP: Currency,
  ARS: Currency,
  BTC: Currency,
  LTC: Currency,
  EUR: Currency,
  JPY: Currency,
  CHF: Currency,
  AUD: Currency,
  CNY: Currency,
  ILS: Currency,
  ETH: Currency,
  XRP: Currency,
  DOGE: Currency,
};
