import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import { RootState } from '../../types';
import './Wallet.css';
import { actionRemoveExpense } from '../../redux/actions';

function Wallet() {
  const { wallet: { expenses } } = useSelector((rootState: RootState) => rootState);
  const dispatch = useDispatch();
  const tableHeadingValues = [
    'Descrição',
    'Tag',
    'Método de pagamento',
    'Valor',
    'Moeda',
    'Câmbio utilizado',
    'Valor convertido',
    'Moeda de conversão',
    'Editar/Excluir',
  ];

  function createHeading(values: string[]) {
    return (
      values.map((value, index) => (
        <th key={ index }>{value}</th>
      ))
    );
  }

  function handleClick(id: number) {
    const newExpenses = expenses.filter((expense) => id !== expense.id);
    dispatch(actionRemoveExpense(newExpenses));
  }

  function createExpenses() {
    return (
      expenses.map(({
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }) => (
        <tr className="expense-container" key={ id }>
          <td>{Number(value).toFixed(2)}</td>
          <td>{description}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
          <td>{method}</td>
          <td>{tag}</td>
          <td>{(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              onClick={ () => handleClick(id) }
              data-testid="delete-btn"
            >
              Excluir
            </button>
          </td>
        </tr>
      ))
    );
  }

  return (
    <div className="wallet-container">
      <Header />
      <WalletForm />
      <table className="wallet-table">
        <thead>
          <tr>
            {createHeading(tableHeadingValues)}
          </tr>
        </thead>
        <tbody>
          {createExpenses()}
        </tbody>
      </table>
    </div>
  );
}

export default Wallet;
