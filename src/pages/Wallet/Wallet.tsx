import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import { RootState } from '../../types';
import './Wallet.css';

function Wallet() {
  const { wallet: { expenses } } = useSelector((rootState: RootState) => rootState);

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
          <p>{value}</p>
          <p>{description}</p>
          <p>{exchangeRates[currency].ask}</p>
          <p>{method}</p>
          <p>{tag}</p>
        </tr>
      ))
    );
  }

  return (
    <div className="wallet-container">
      <Header />
      <WalletForm />
      <table className="wallet-table">
        <tbody>
          {createExpenses()}
        </tbody>
      </table>
    </div>
  );
}

export default Wallet;
