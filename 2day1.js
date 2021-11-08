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

function countLetter(str, l) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) == l) count++;
  }
  return count;
}

function isValid(str) {
  let splitted = splitLine(str);
  let numArr = makeNumber(splitted[0]);
  let min = numArr[0];
  let max = numArr[1];
  let letter = splitted[1].charAt(0);
  let counted = countLetter(splitted[2], letter);
  let valid = false;
  if (counted >= min && counted <= max) valid = true;
  return valid;
}

function howManyValid(list) {
  let validOnes = list.filter((n) => isValid(n));
  return validOnes.length;
}

console.log(howManyValid(input));
