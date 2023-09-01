import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { USER_INITIAL_STATE } from '../../redux/reducers/user';
import { actionUpdateUserDetails } from '../../redux/actions';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState<User>(USER_INITIAL_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function validateForm() {
    const { email, password } = formData;
    const regex = /^\S+@\S+\.\S+$/;

    return regex.test(email) && password.length >= 6;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(actionUpdateUserDetails(formData));
    navigate('/carteira');
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={ handleSubmit }>
          <label htmlFor="email-input">
            <input
              data-testid="email-input"
              id="email-input"
              name="email"
              placeholder="Email"
              type="email"
              value={ formData.email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="password-input">
            <input
              data-testid="password-input"
              id="password-input"
              name="password"
              placeholder="Senha"
              type="password"
              value={ formData.password }
              onChange={ handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ !validateForm() }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
