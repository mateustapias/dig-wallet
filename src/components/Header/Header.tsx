import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import './Header.css';

function Header() {
  const { user: { email }, wallet: { expenses } } = useSelector((rootState: RootState) => rootState);
  return (
    <div className="header-container">
      <div className="email-container">
        <span data-testid="email-field">
          {email}
        </span>
      </div>
      <div className="total-container">
          Despesa total:
        <span data-testid="total-field">
          {expenses.reduce((acc, cur) => {
            const { value, currency, exchangeRates } = cur;
            return (acc + (Number(value) * Number(exchangeRates[currency].ask)));
          }, 0).toFixed(2)}
        </span>
      </div>
      <div className="header-currency-container">
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    </div>
  );
}

export default Header;
