import fetchCurrenciesInfo from '../../services/fetchCurrenciesAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES_INFO = 'REQUEST_CURRENCIES_INFO';
export const RESPONSE_CURRENCIES_INFO = 'RESPONSE_CURRENCIES_INFO';
export const ERROR_CURRENCIES_INFO = 'ERROR_CURRENCIES_INFO';

export const ADD_EXPENSE = 'ADD_EXPENSE';

// ACTION CREATORS

// SAVE EMAIL

const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

// ACTIONS TO CURRENCIES INFO

const requestCurrenciesInfo = () => ({ type: REQUEST_CURRENCIES_INFO });

const responseCurrenciesInfo = (currencies) => (
  { type: RESPONSE_CURRENCIES_INFO, currencies }
);

const errorCurrenciesInfo = (error) => ({ type: ERROR_CURRENCIES_INFO, error });

// ACTIONS TO CURRENCIES TO EXPENSES

const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

// THUNKS

export const fetchCurrenciesAPI = () => async (dispatch) => {
  dispatch(requestCurrenciesInfo());
  try {
    const response = await fetchCurrenciesInfo();
    const filteredCurrencies = Object.keys(response)
      .filter((currency) => currency !== 'USDT');
    dispatch(responseCurrenciesInfo(filteredCurrencies));
  } catch (e) {
    dispatch(errorCurrenciesInfo(e));
  }
};

export const fetchCurrenciesToExpenses = (expenseDetails) => async (dispatch) => {
  const expense = {
    ...expenseDetails,
    exchangeRates: await fetchCurrenciesInfo(),
  };
  dispatch(addExpense(expense));
};

export default saveEmail;
