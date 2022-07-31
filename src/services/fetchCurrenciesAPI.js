const fetchCurrenciesInfo = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
};

export default fetchCurrenciesInfo;
