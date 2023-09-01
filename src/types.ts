import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type Expense = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: number,
};

export type RootState = {
  user: {
    email: string | undefined,
    password: string | undefined
  },
  wallet: {
    currencies: string[],
    expenses: Expense[]
  }
};

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;

export type User = {
  email: string,
  password: string,
};

export type Currency = {
  code: string,
  codein: string,
  name: string,
  high: number,
  low: number,
  varBid: number,
  pctChange: number,
  bid: number,
  ask: number,
  timestamp: number,
  create_date: string
};
