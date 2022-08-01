import fetchCurrenciesInfo from '../../services/fetchCurrenciesAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const RESPONSE_CURRENCIES_INFO = 'RESPONSE_CURRENCIES_INFO';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const FINISHED_EDITION = 'FINISHED_EDITION';

// ACTION CREATORS

// SAVE EMAIL

const saveEmail = (email) => ({ type: SAVE_EMAIL, email });

// ACTIONS TO CURRENCIES INFO

const responseCurrenciesInfo = (currencies) => (
  { type: RESPONSE_CURRENCIES_INFO, currencies }
);

// ACTIONS TO CURRENCIES TO EXPENSES

const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
export const removeExpense = (expenseId) => ({ type: REMOVE_EXPENSE, expenseId });
export const editExpense = (expenseId) => ({ type: EDIT_EXPENSE, idToEdit: expenseId });
export const finishedEdition = () => ({ type: FINISHED_EDITION });

// THUNKS

export const fetchCurrenciesAPI = () => async (dispatch) => {
  const response = await fetchCurrenciesInfo();
  const filteredCurrencies = Object.keys(response)
    .filter((currency) => currency !== 'USDT');
  dispatch(responseCurrenciesInfo(filteredCurrencies));
};

export const fetchCurrenciesToExpenses = (expenseDetails) => async (dispatch) => {
  const expense = {
    ...expenseDetails,
    exchangeRates: await fetchCurrenciesInfo(),
  };
  dispatch(addExpense(expense));
};

export default saveEmail;
