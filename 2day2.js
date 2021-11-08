const fs = require("fs");
const input = fs.readFileSync("./2dayinput.txt").toString().split("\n");

function splitLine(str) {
  const space = " ";
  return str.split(space);
}

function makeNumber(str) {
  let res = str.split("-");
  return res.map((n) => Number(n));
}

function isValid(str) {
  let splitted = splitLine(str);
  let numArr = makeNumber(splitted[0]);
  let min = numArr[0] - 1;
  let max = numArr[1] - 1;
  let letter = splitted[1].charAt(0);
  let pwd = splitted[2];
  let valid = false;
  if (
    (pwd.charAt(min) == letter && pwd.charAt(max) != letter) ||
    (pwd.charAt(min) != letter && pwd.charAt(max) == letter)
  ) {
    valid = true;
  }
  return valid;
}

function howManyValid(list) {
  let validOnes = list.filter((n) => isValid(n));
  return validOnes.length;
}

console.log(howManyValid(input));
