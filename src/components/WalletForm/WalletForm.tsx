import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, RootState } from '../../types';
import { actionAddExpense, actionFetchCurrencies } from '../../redux/actions';
import './WalletForm.css';

type FormData = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
};

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  const { wallet: {
    currencies, exchangeRates,
  } } = useSelector((rootState: RootState) => rootState);

  const methods = [
    'Dinheiro',
    'Cartão de crédito',
    'Cartão de débito',
  ];
  const tags = [
    'Alimentação',
    'Lazer',
    'Trabalho',
    'Transporte',
    'Saúde',
  ];

  const EXPENSE_INITIAL_STATE = {
    value: '',
    description: '',
    currency: 'USD',
    method: methods[0],
    tag: tags[0],
  };

  const [formData, setFormData] = useState<FormData>({ ...EXPENSE_INITIAL_STATE, id: 0 });
  const { id = 0, value, currency, method, tag, description } = formData;

  useEffect(() => {
    dispatch(actionFetchCurrencies());
  }, [dispatch]);

  function createOptions(arrayName: string[]) {
    return (
      arrayName.map((optionValue, index) => (
        <option
          key={ index }
          value={ optionValue }
        >
          {optionValue}
        </option>
      ))
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { target: { name, value: targetValue } } = e;
    setFormData({ ...formData, [name]: targetValue });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    async function addExpense() {
      await dispatch(actionFetchCurrencies());
      dispatch(actionAddExpense({ ...formData, exchangeRates }));
    }
    addExpense();
    setFormData({ ...EXPENSE_INITIAL_STATE, id: id + 1 });
  }

  if (!currencies) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <div className="wallet-form-container">
      <form onSubmit={ handleSubmit }>
        <label>
          Valor:
          {' '}
          <input
            data-testid="value-input"
            className="value-input"
            name="value"
            value={ value }
            onChange={ handleChange }
          />
        </label>
        <label>
          Descrição:
          {' '}
          <input
            data-testid="description-input"
            className="description-input"
            name="description"
            value={ description }
            onChange={ handleChange }
          />
        </label>
        <label>
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            className="currency-input"
            name="currency"
            value={ currency }
            onChange={ handleChange }
          >
            {createOptions(currencies)}
          </select>
        </label>
        <label>
          Método de pagamento:
          {' '}
          <select
            data-testid="method-input"
            className="method-input"
            name="method"
            value={ method }
            onChange={ handleChange }
          >
            {createOptions(methods)}
          </select>
        </label>
        <label>
          Categoria:
          {' '}
          <select
            data-testid="tag-input"
            className="tag-input"
            name="tag"
            value={ tag }
            onChange={ handleChange }
          >
            {createOptions(tags)}
          </select>
        </label>
        <button
          type="submit"
          className="wallet-form-submit-button"
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
