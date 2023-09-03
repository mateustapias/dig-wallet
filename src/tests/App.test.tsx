import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import * as APIModule from '../services/currenciesAPI';

beforeEach(() => {
  vi.spyOn(APIModule, 'getCurrenciesfromAPI').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const mockEmail = 'randomUser@trybe.com';
const mockPassword = 'randomPassword';

describe('Testando a página Login', () => {
  test('Testa se existe os inputs de email e senha, assim como um botão submit', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });
  test('Testa se as informações são atualizadas e salvas no Redux, e em seguida é direcionado para a rota "/carteira"', async () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();

    await userEvent.type(emailInput, mockEmail);
    await userEvent.type(passwordInput, mockPassword);
    await userEvent.click(submitButton);

    expect(store.getState().user.email).toBe(mockEmail);
    expect(store.getState().user.password).toBe(mockPassword);
    expect(emailInput).not.toBeInTheDocument();
  });
});

describe('Testando a página Wallet', () => {
  test('Testa se existem os inputs "Valor", "Descrição", "Moeda", "Método de pagamento" e "Categoria", assim como um botão submit', async () => {
    const initialState = {
      user: {
        email: mockEmail,
        password: mockPassword,
      },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [],
        exchangeRates: mockData,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const valueInput = screen.getByLabelText('Valor:');
    const descriptionInput = screen.getByLabelText('Descrição:');
    const currencyInput = screen.getByLabelText('Moeda:');
    const methodInput = screen.getByLabelText('Método de pagamento:');
    const tagInput = screen.getByLabelText('Categoria:');
    const submitBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await userEvent.type(valueInput, '10');
    await userEvent.type(descriptionInput, 'Teste');
    await userEvent.selectOptions(currencyInput, 'USD');
    await userEvent.selectOptions(methodInput, 'Cartão de débito');
    await userEvent.selectOptions(tagInput, 'Trabalho');
    await userEvent.click(submitBtn);
  });
  test('Testa se aparece a tela de Carregamento enquanto o fetch das moedas é feito', () => {
    const initialState = {
      user: {
        email: mockEmail,
        password: mockPassword,
      },
      wallet: {
        currencies: null,
        expenses: [],
        exchangeRates: mockData,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const loadingText = screen.getByText('Carregando...');
    expect(loadingText).toBeInTheDocument();
  });
});
