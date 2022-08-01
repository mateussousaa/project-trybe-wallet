import {
  ERROR_CURRENCIES_INFO,
  RESPONSE_CURRENCIES_INFO,
  REQUEST_CURRENCIES_INFO,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  loading: false,
  currencies: [],
  expenses: [],
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_INFO:
    return {
      ...state,
      loading: true,
    };
  case RESPONSE_CURRENCIES_INFO:
    return {
      ...state,
      loading: false,
      currencies: action.currencies,
    };
  case ERROR_CURRENCIES_INFO:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.expenseId),
    };
  default:
    return state;
  }
};

export default wallet;
