const fs = require("fs");

const inputConditions = fs
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
  .readFileSync("./16daymyticket.txt")
  .toString()
  .replace("your ticket:", "")
  .trim();
const myTicket = inputTicket.split(",");
//console.log(myTicket);

const inputNearby = fs
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

function isValidTicket(arr) {
  let sum = 0;
  arr.forEach((ticket) => {
    ticket.forEach((num) => {
      if (!isValid(Number(num))) sum += Number(num);
    });
  });
  return sum;
}

console.log(isValidTicket(nearby));
