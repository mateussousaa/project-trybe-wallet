const fetchCurrenciesInfo = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const response = await request.json();
  const filteredCurrencies = Object.keys(response)
    .filter((currency) => currency !== 'USDT');
  return filteredCurrencies;
};

export default fetchCurrenciesInfo;
