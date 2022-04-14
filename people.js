// Mehrab Syed
// I pledge my honor that I have abided by the Stevens Honor System

const axios = require("axios");

const getPeople = async function getPeople() {
  const {
    data
  } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
  return data; // this will be the array of people objects
}

// Helper Functions
function checkIsValidDomain(emailDomain) {
  if (emailDomain === undefined) throw "Error: Input is undefined";
  if (typeof(emailDomain) !== "string") throw "Error: Input is not in proper format";
  if (emailDomain.trim().length == 0) throw "Error: Empty spaces not allowed";
  if (emailDomain.lastIndexOf('.') < 0) throw "Error: Does not contain dot";
  if (emailDomain.length - emailDomain.lastIndexOf('.') <= 2) throw "Error: Does not contain 2 letters after the dot";
}

function checkIsValidDate(month, day) {
  if (month === undefined) throw "Error: Month Input is undefined";
  if (day === undefined) throw "Error: Day Input is undefined";
  if (isNaN(month)) throw "Error: Month Input is not a number";
  if (isNaN(day)) throw "Error: Day Input is not a number";
  if (month > 12 || month < 1) throw "Error: Month in incorrect range";

  switch (month) {
    case 1:
      if (day > 32) throw "Day in incorrect range";
      break;
    case 2:
      if (day >= 29) throw "Day in incorrect range";
      break;
    case 3:
      if (day >= 32) throw "Day in incorrect range";
      break;
    case 4:
      if (day >= 31) throw "Day in incorrect range";
      break;
    case 5:
      if (day >= 32) throw "Day in incorrect range";
      break;
    case 6:
      if (day >= 31) throw "Day in incorrect range";
      break;
    case 7:
      if (day >= 32) throw "Day in incorrect range";
      break;
    case 8:
      if (day >= 32) throw "Day in incorrect range";
      break;
    case 9:
      if (day >= 31) throw "Day in incorrect range";
      break;
    case 10:
      if (day >= 32) throw "Day in incorrect range";
      break;
    case 11:
      if (day >= 31) throw "Day in incorrect range";
      break;
    case 12:
      if (day >= 32) throw "Day in incorrect range";
      break;
  }
}


const getPersonById = async function getPersonById(id) {
  if (typeof(id) !== "string") throw "Error: Input is not in proper format";

  let people = await getPeople();

  for (let i = 0; i < people.length; i++) {
    if (people[i].id === id) {
      return people[i];
    }
  }
  throw "Error: person not found";
}


const sameEmail = async function sameEmail(emailDomain) {
  checkIsValidDomain(emailDomain);
  emailDomain = emailDomain.toLowerCase();
  let people = await getPeople();
  let results = [];
  for (let p of people) {
    if (p.email.indexOf(emailDomain) >= 0) {
      results.push(p);
    }
  }

  if (results.length < 2) throw "Error: Not 2 or more ppl with the same email domain";
  return results;

}
const manipulateIp = async function manipulateIp() {

  let people = await getPeople();

  function transformString(string) {
    let newString = string.split("").sort().join("");
    newString = newString.substr(newString.lastIndexOf('.') + 1);
    newString = newString.substr(newString.lastIndexOf('0') + 1);
    return parseInt(newString);
  }

  //helper function for each person loop
  const first_ip = transformString(people[0].ip_address);
  let minIp = first_ip;
  let maxIp = first_ip;
  let sum = 0;
  let highest = {
    firstName: people[0].first_name,
    lastName: people[0].last_name
  };
  let lowest = {
    firstName: people[0].first_name,
    lastName: people[0].last_name
  };
  let ip;
  for (let p of people) {
    ip = transformString(p.ip_address);

    if (ip > maxIp) {
      maxIp = ip;
      highest.firstName = p.first_name;
      highest.lastName = p.last_name;
    }
    if (ip < minIp) {
      minIp = ip;
      lowest.firstName = p.first_name;
      lowest.lastName = p.last_name;
    }

    sum += ip;

  }
  let avg = sum / people.length;
  return {
    highest,
    lowest,
    average: avg
  };
}

const sameBirthday = async function sameBirthday(month, day) {
  let people = await getPeople();

  month = parseInt(month);
  day = parseInt(day);

  checkIsValidDate(month, day);

  let results = [];

  for (let p of people) {
    let splitString = p.date_of_birth.split("/");
    let stringMonth = splitString[0];
    let stringDay = splitString[1];

    if (stringMonth == month && stringDay == day) {

      results.push(p.first_name + " " + p.last_name);
    }
  }
  if (results.length === 0) throw "Error: No results found";
  return results;
}


module.exports = {
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday,

};
