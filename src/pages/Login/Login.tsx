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

  function validateEmail() {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(formData.email);
  }

  function validatePassword() {
    return formData.password.length >= 6;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(actionUpdateUserDetails(formData));
    navigate('/carteira');
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Trybewallet</h1>
        <form onSubmit={ handleSubmit }>
          <label>
            <input
              data-testid="email-input"
              className="email-input"
              name="email"
              autoComplete="off"
              placeholder="Email"
              type="email"
              value={ formData.email }
              onChange={ handleChange }
            />
          </label>
          {!validateEmail() && <span>Digite um email válido</span>}
          <label>
            <input
              data-testid="password-input"
              className="password-input"
              name="password"
              autoComplete="off"
              placeholder="Senha"
              type="password"
              value={ formData.password }
              onChange={ handleChange }
            />
          </label>
          {!validatePassword() && <span>Sua senha deve ter mais que 6 caracteres</span>}
          <button
            type="submit"
            disabled={ !(validateEmail() && validatePassword()) }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
