import {
  RESPONSE_CURRENCIES_INFO,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  FINISHED_EDITION,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESPONSE_CURRENCIES_INFO:
    return {
      ...state,
      currencies: action.currencies,
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
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
    };
  case FINISHED_EDITION:
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
