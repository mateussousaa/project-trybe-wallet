import fetchCurrenciesInfo from '../../services/fetchCurrenciesAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES_INFO = 'REQUEST_CURRENCIES_INFO';
export const RESPONSE_CURRENCIES_INFO = 'RESPONSE_CURRENCIES_INFO';
export const ERROR_CURRENCIES_INFO = 'ERROR_CURRENCIES_INFO';

const saveEmail = (email) => ({ type: SAVE_EMAIL, email });
const requestCurrenciesInfo = () => ({ type: REQUEST_CURRENCIES_INFO });
const responseCurrenciesInfo = (currencies) => (
  { type: RESPONSE_CURRENCIES_INFO, currencies }
);
const errorCurrenciesInfo = (error) => ({ type: ERROR_CURRENCIES_INFO, error });

export const fetchCurrenciesAPI = () => async (dispatch) => {
  dispatch(requestCurrenciesInfo());
  try {
    const response = await fetchCurrenciesInfo();
    dispatch(responseCurrenciesInfo(response));
  } catch (e) {
    dispatch(errorCurrenciesInfo(e));
  }
};

export default saveEmail;
