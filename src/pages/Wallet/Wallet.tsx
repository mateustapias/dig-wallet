import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import { RootState } from '../../types';
import './Wallet.css';

function Wallet() {
  const { wallet: { expenses } } = useSelector((rootState: RootState) => rootState);
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

  function createExpenses() {
    return (
      expenses.map(({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }, index) => (
        <tr className="expense-container" key={ index }>
          <td>{Number(value).toFixed(2)}</td>
          <td>{description}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
          <td>{method}</td>
          <td>{tag}</td>
          <td>{(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
          <td>Real</td>
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
