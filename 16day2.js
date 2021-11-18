const fs = require("fs");

const inputConditions = fs
  //.readFileSync("./testgeneral.txt")
  .readFileSync("./16daygeneral.txt")
  .toString()
  .split("\n");
const conditions = [];
inputConditions.forEach((el) => {
  const obj = {};
  let index = el.indexOf(":");
  let key = el.substring(0, index);
  let valueArr = el.substring(index + 2).split(" or ");
  obj[key] = valueArr.map((group) => {
    return group.split("-");
  });
  conditions.push(obj);
});

const inputTicket = fs
  //.readFileSync("./testmyticket.txt")
  .readFileSync("./16daymyticket.txt")
  .toString()
  .replace("your ticket:", "")
  .trim();
const myTicket = inputTicket.split(",");
//console.log(myTicket);

const inputNearby = fs
  //.readFileSync("./testnearby.txt")
  .readFileSync("./16daynearby.txt")
  .toString()
  .replace("nearby tickets:", "")
  .split("\n")
  .splice(1);
const nearby = inputNearby.map((row) => row.split(","));

function isValid(num) {
  let isValid = false;
  conditions.forEach((condition) => {
    for (key in condition) {
      condition[key].forEach((subarr) => {
        if (
          Number(num) >= Number(subarr[0]) &&
          Number(num) <= Number(subarr[1])
        )
          isValid = true;
      });
    }
  });
  return isValid;
}

//removes the non valid tickets
function isValidTicket(arr) {
  let newArr = arr.filter((ticket) => {
    let flag = true;
    ticket.forEach((num) => {
      if (!isValid(Number(num))) flag = false;
    });
    return flag;
  });
  return newArr;
}
const validTickets = isValidTicket(nearby); //sono 190

//utility function that checks which conditions meet the number in the ticket
function isCoditionFitting(num) {
  let validConditions = [];
  conditions.forEach((condition) => {
    for (key in condition) {
      condition[key].forEach((subarr) => {
        if (
          Number(num) >= Number(subarr[0]) &&
          Number(num) <= Number(subarr[1])
        )
          validConditions.push(key);
      });
    }
  });
  return validConditions;
}

//for each ticket(i.e. row of the valid tickets array) puts the conditions that match  each number
function fittingCoditions(arr) {
  const result = arr.map((row) => {
    let subarr = [];
    row.forEach((num) => {
      subarr.push(isCoditionFitting(num));
    });
    return subarr;
  });
  return result;
}
const fittingCoditionsArr = fittingCoditions(validTickets);

//utility function that tansposes rows with columns
function transpose(arr) {
  let transposed = [];
  for (let i = 0; i < arr[0].length; i++) {
    let subarr = [];
    arr.forEach((el) => {
      subarr.push(el[i]);
    });
    transposed.push(subarr);
  }
  return transposed;
}

//create this transposed array where each row represents the matching conditions of every corresponding element in the valid ticket array; for example, the first row of the transposed array represents all the first elements of the various rows of the valid ticket array (that is the first column of the valid ticket array)
const transposedArr = transpose(fittingCoditionsArr);
//console.log(transposedArr);

//utility function to find common elements in various arrays
function intersection(arrays) {
  return arrays.reduce((current, next) => {
    const filtered = [];
    next.forEach((el) => {
      if (current.includes(el)) filtered.push(el);
    });
    return filtered; //this becomes the new current
  });
}

//modify the transposed array so that only the shared conditions appear
let sharedConditions = transposedArr.map((row) => intersection(row));
//console.log(sharedConditions);

//nell'array filtro per elementi con lunghezza zero
//se esistono li inserisco in un array di appoggio insieme al loro indice nell'array di partenza
const ticketIndications = [];
for (let i = 0; i < conditions.length; i++) {
  let obj = {
    type: "",
    position: 0,
  };
  sharedConditions.forEach((el, index) => {
    if (el.length == 1) {
      (obj.type = el.toString()),
        (obj.position = index),
        ticketIndications.push(obj);
    }
  });

  sharedConditions = sharedConditions.map((el) =>
    el.filter((x) => !x.includes(obj.type))
  );
}

const departureIndications = ticketIndications.filter((indication) =>
  indication.type.includes("departure")
);

const myTicketNumbers = [];
for (let entry of departureIndications) {
  let number = myTicket[entry.position];
  myTicketNumbers.push(number);
}
const result = myTicketNumbers.reduce((acc, next) => {
  return acc * next;
}, 1);
console.log(result);
