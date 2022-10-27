const currencyDiv = document.querySelector(".result-section__currencies");
const inputValue = document.querySelector(".input-section__input");
const convertButton = document.querySelector(".input-section__button");

let changeStatus = false;

const currencies = [
  { name: "USD", symbol: "&#36;", value: " --"},
  { name: "GBP", symbol: "&#163;", value: " --" },
  { name: "EUR", symbol: "&#128;", value: " --"},
];

const baseCurrency = "BRL";
const currencyNames = currencies.map(({ name }) => name);

// API

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

const factors = async () => {
  await getCalculationFactors(getResponse, apiURL, changeStatus);
};

// DOM

const changeCurrencyValues = (inputValue, factors, currencies) => {
  for(let index in currencies){
    currencies[index].value = toString(' ' + (inputValue * factors[index]));
  }
};

const renderCurrencyElements = (currencies, currencyDiv) => {
  currencies.forEach((currency) => {
    const currencyElement = `
      <div class="result-section__currency-box">
        <ion-icon class="result-section__currency-logo" name="cash-outline"></ion-icon>
        <h2 class="result-section__currency-name">${currency.name}</h2>
        <h2 class="result-section__currency-holder">${currency.symbol}<span class="result-section__currency-value">${currency.value}</span></h2>
      </div>
    `;

    currencyDiv.innerHTML += currencyElement;
  });
};


const getCurrencyValueElements = () => {
  return document.querySelectorAll(".result-section__currency-value");
};

const addValuesToCurrencyElements = (changeStatus, currencies) => {
  const curencyElements = getCurrencyValueElements();

  if (changeStatus){
    for (let index in curencyElements){
      currencyElements[index].innerText = currencies[index].value;
    }
  }
};

// Events

const handleConvertButtonClick = (event) => {
};

window.onload = () => {
  console.log(inputValue.value);
  renderCurrencyElements(currencies, currencyDiv);
};

// Add event listeners
convertButton.addEventListener("click", handleConvertButtonClick);
