import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import './Header.css';

function Header() {
  const { user:
    { email },
  wallet:
    { expenses } } = useSelector((rootState: RootState) => rootState);

  return (
    <header className="header-container">
      <div className="email-container">
        <span data-testid="email-field">
          {email}
        </span>
      </div>
      <div className="total-container">
        <h2>
          Despesa total:
          {' '}
          R$
          {' '}
          <span data-testid="total-field">
            {expenses.reduce((acc, cur) => {
              const { value, currency, exchangeRates } = cur;
              const sum = (acc + (Number(value) * Number(exchangeRates[currency].ask)));
              return sum;
            }, 0).toFixed(2)}
          </span>
        </h2>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </div>
    </header>
  );
}

export default Header;
