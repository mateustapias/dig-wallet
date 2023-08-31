import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import './Header.css';

function Header() {
  const { user: { email } } = useSelector((rootState: RootState) => rootState);

  return (
    <div className="header-container">
      <div className="email-container">
        <span data-testid="email-field">
          {email}
        </span>
        <span>oiii</span>
      </div>
      <div className="total-container">
        <span data-testid="total-field">
          0
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
