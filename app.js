const axios = require("axios");
const people = require("./people");
const stocks = require("./stocks");


async function main() {

  //getPersonById(id)
  try {
    console.log("people.getPersonById");
    console.log(await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"));
  } catch (e) {
    console.log(e);
  }

  //sameEmail(emailDomain)
  try {
    console.log("people.sameEmail");
    console.log(await people.sameEmail("HARVARD.edu"));
  } catch (e) {
    console.log(e);
  }


  // manipulateIp()
  try {
    console.log("people.manpulateIp");
    console.log(await people.manipulateIp());
  } catch (e) {
    console.log(e);
  }


  // sameBirthday(month, day)
  try {
    console.log("people.sameBirthday");
    console.log(await people.sameBirthday(9, 31));
  } catch (e) {
    console.log(e);
  }


  //listShareholders(stockName)
  try {
    console.log("stocks.listShareholders");
    console.log(await stocks.listShareholders("Aeglea BioTherapeutics, Inc."));
  } catch (e) {
    console.log(e);
  }

  //totalShares(stockName)
  try {
    console.log("stocks.totalShares");
    console.log(await stocks.totalShares("Aeglea BioTherapeutics, Inc."));
  } catch (e) {
    console.log(e);
  }

  //listStocks
  try {
    console.log("stocks.listStocks");
    console.log(await stocks.listStocks("Grenville", "Pawelke"));
  } catch (e) {
    console.log(e);
  }

  //getStockById
  try {
    console.log("stocks.getStockById");
    console.log(await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"));

  } catch (e) {
    console.log(e);
  }

}

main();
