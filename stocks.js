// Mehrab Syed
// I pledge my honor that I have abided by the Stevens Honor System

const people = require("./people");
const axios = require("axios");

const getStocks = async function getStocks() {
  const {
    data
  } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
  return data; // this will be the array of stock objects
}

//Checking Inputs
function checkIsValidStock(stockName) {
  if (stockName === null || stockName === undefined || stockName === "") {
    throw "Error: Stock Name must not be empty";
  }
  if (typeof stockName !== "string") {
    throw "Error: Stock Name is not a string";
  }
  if (!stockName.match(/[\w]/)) {
    throw "Error: Stock Name cant be only spaces";
  }
}

function checkValidNames(firstName, lastName) {
  if (firstName === null || firstName === undefined || firstName === "") {
    throw Error("First name is empty");
  }
  if (lastName === null || lastName === undefined || lastName === "") {
    throw "Error: Last name is empty";
  }
  if (typeof firstName !== "string") {
    throw "Error: firstName must be a string";
  }
  if (typeof lastName !== "string") {
    throw "Error:lastName must be a string";
  }
  if (!firstName.match(/[\w]/)) {
    throw "Error: firstName must not be only spaces";
  }
  if (!lastName.match(/[\w]/)) {
    throw "Error: Last name must not be only spaces";
  }

}

function isValidId(id) {
  if (id === null || id === undefined || id === "") {
    throw "Error: id is empty";
  }
  if (typeof id !== "string") {
    throw " Error: id is not a string";
  }
  if (!id.match(/[\w-]/)) {
    throw "Error: id must not be only spaces";
  }
}


const listShareholders = async function listShareholders(stockName) {

  checkIsValidStock(stockName);
  let stocks = await getStocks();

  let results = [];
  let shareHolders = [];
  let temp = {};

  for (let i = 0; i < stocks.length; i++) {

    if (stocks[i].stock_name === stockName) {
      temp.id = stocks[i].id;
      temp.stock_name = stocks[i].stock_name;
      results = stocks[i].shareholders;
      break;
    }
  }

  for (let sh of results) {
    let curr = {};
    curr.number_of_shares = sh.number_of_shares;
    let p = await people.getPersonById(sh.userId);
    curr.first_name = p.first_name;
    curr.last_name = p.last_name;
    shareHolders.push(curr);
  }
  temp.shareholders = shareHolders;

  return temp;
}



const totalShares = async function totalShares(stockName) {

  checkIsValidStock(stockName);

  const stocks = await getStocks();
  const stock = stocks.find((item) => item.stock_name === stockName);
  if (!stock) {
    throw Error("Stock not found");
  }

  let result = `${stockName}`;

  const stockLength = stock.shareholders.length;
  if (stockLength) {
    let totalShares = 0;
    stock.shareholders.forEach((item) => {
      totalShares += item.number_of_shares;
    });
    const holders = stockLength > 1 ? "shareholders" : "shareholder";
    result += `, has ${stockLength} ${holders} that owns a total of ${totalShares} shares.`;
  } else {
    result += ` currently has zero shareholders.`;
  }

  return result;
}

const listStocks = async function listStocks(firstName, lastName) {

  checkValidNames(firstName, lastName);

  const {
    data: ppl
  } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json");
  const person = ppl.find((item) => item.first_name === firstName && item.last_name === lastName);
  if (!person) {
    throw Error("Person not found");
  }

  const {
    data: stockData
  } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  const stocks = [];
  stockData.forEach((stock) => {
    const share = stock.shareholders.find((share) => share.userId === person.id);
    if (share) {
      stocks.push({
        stock_name: stock.stock_name,
        number_of_shares: share.number_of_shares
      });
    }
  });
  if (!stocks.length) {
    throw Error("Person do not have shares");
  }

  return stocks;

}

const getStockById = async function getStockById(id) {

  isValidId(id);

  const {
    data
  } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );

  const stock = data.find((item) => item.id === id);
  if (!stock) {
    throw Error("Stock not found");
  }

  return stock;
}

module.exports = {
  listShareholders,
  totalShares,
  listStocks,
  getStockById,
};
