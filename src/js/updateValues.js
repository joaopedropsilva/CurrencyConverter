const currenciesDivElement = document.querySelector(
  ".result-section__currencies"
);
const inputValue = document.querySelector(".input-section__input");

let changeStatus = false;

const currencies = [
  { name: "USD", symbol: "&#36;" },
  { name: "GBP", symbol: "&#163;" },
  { name: "EUR", symbol: "&#128;" },
];

const baseCurrency = "BRL";
const currenciesName = currencies.map(({ name }) => name);

const apiURL = `http://economia.awesomeapi.com.br/json/last/${currenciesName.join(
  "-BRL,"
)}`;

const getResponse = async (apiURL) => {
  const response = await fetch(apiURL);

  return await response.json();
};

const getCalculationFactors = async (getResponse, apiURL, changeStatus) => {
  try {
    let factorsJSON = await getResponse(apiURL);
    let factors = [];

    factors.push(parseFloat(factorsJSON.USDBRL.bid));
    factors.push(parseFloat(factorsJSON.GBPBRL.bid));
    factors.push(parseFloat(factorsJSON.EURBRL.bid));

    changeStatus = true;
    return factors;
  } catch (error) {
    console.error(error);
    changeStatus = false;
  }
};

const changeCurrenciesValues = (
  currenciesElements,
  currencySymbols,
  inputValue,
  factors,
  changeStatus
) => {
  if (changeStatus) {
    for (let index in currencies) {
      currenciesElements[index].innerText =
        currencySymbols[index] + toString(inputValue * factors[index]);
    }
  }
};

const renderCurrenciesElements = (currencies, currenciesDivElement) => {
  currencies.forEach((currency) => {
    const currencyElement = `
      <div class="result-section__currency-box">
        <ion-icon class="result-section__currency-logo" name="cash-outline"></ion-icon>
        <h2 class="result-section__currency-name">${currency.name}</h2>
        <h2 class="result-section__currency-name">${currency.symbol}</h2>
      </div>
    `;

    currenciesDivElement.innerHTML += currencyElement;
  });
};

window.onload = () => {
  renderCurrenciesElements(currencies, currenciesDivElement);

  (async () => {
    let factors = await getCalculationFactors(
      getResponse,
      apiURL,
      changeStatus
    );

    console.log(factors);
  })();
};

// Add event listeners
