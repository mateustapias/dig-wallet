import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import './Header.css';

function Header() {
  const { user:
    { email },
  wallet:
    { expenses } } = useSelector((rootState: RootState) => rootState);

  return (
    <div className="header-container">
      <div className="email-container">
        <span data-testid="email-field">
          {email}
        </span>
      </div>
      <div className="total-container">
        <h2 data-testid="total-field">
          Despesa total:
          {' '}
          R$
          {' '}
          {expenses.reduce((acc, cur) => {
            const { value, currency, exchangeRates } = cur;
            const sum = (acc + (Number(value) * Number(exchangeRates[currency].ask)));
            return sum;
          }, 0).toFixed(2)}
        </h2>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </div>
    </div>
  );
}

export default Header;
