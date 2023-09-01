import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { actionFetchCurrencies, actionUpdateExpenses } from '../../redux/actions';
import { Dispatch, Expense, RootState } from '../../types';

function Wallet() {
  const dispatch: Dispatch = useDispatch();
  const { wallet: { currencies } } = useSelector((rootState: RootState) => rootState);
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

  const [formData, setFormData] = useState<Expense>(EXPENSE_INITIAL_STATE as Expense);
  const { id, value, currency, method, tag, description } = formData;

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

  function createExpense() {

  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(actionUpdateExpenses(formData));
  }

  if (!currencies) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <div className="wallet-container">
      <Header />
      <form className="wallet-form-container" onSubmit={ handleSubmit }>
        <label>
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ handleChange }
          />
        </label>
        <label>
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ handleChange }
          />
        </label>
        <label>
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ handleChange }
          >
            {createOptions(currencies)}
          </select>
        </label>
        <label>
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ handleChange }
          >
            {createOptions(methods)}
          </select>
        </label>
        <label>
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ handleChange }
          >
            {createOptions(tags)}
          </select>
        </label>
        <button
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default Wallet;
