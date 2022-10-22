const currencyDiv = document.querySelector(".result-section__currencies");
const inputValue = document.querySelector(".input-section__input");
const convertButton = document.querySelector(".input-section__button");

let changeStatus = false;

const currencies = [
  { name: "USD", symbol: "&#36;" },
  { name: "GBP", symbol: "&#163;" },
  { name: "EUR", symbol: "&#128;" },
];

const baseCurrency = "BRL";
const currencyNames = currencies.map(({ name }) => name);

const apiURL = `http://economia.awesomeapi.com.br/json/last/${currencyNames.join(
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

// TODO: check this
const factors = async () => {
  await getCalculationFactors(getResponse, apiURL, changeStatus);
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

const renderCurrencyElements = (currencies, currencyDiv) => {
  currencies.forEach((currency) => {
    const currencyElement = `
      <div class="result-section__currency-box">
        <ion-icon class="result-section__currency-logo" name="cash-outline"></ion-icon>
        <h2 class="result-section__currency-name">${currency.name}</h2>
        <h2 class="result-section__currency-holder">${currency.symbol}<span class="result-section__currency-value"></span></h2>
      </div>
    `;

    currencyDiv.innerHTML += currencyElement;
  });
};

// FIXME: finish this logic
const getCurrencyElements = () => {
  return document.querySelectorAll(".result-section__currency-value");
};

const addValuesToCurrencyElements = (changeStatus) => {
  const curencyElements = getCurrencyElements();
};

const handleConvertButtonClick = (event) => {};

window.onload = () => {
  renderCurrencyElements(currencies, currencyDiv);
};

// Add event listeners
convertButton.addEventListener("click", handleConvertButtonClick);
