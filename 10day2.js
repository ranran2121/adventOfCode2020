const fs = require("fs");

const input = fs
  .readFileSync("./10dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n")
  .map((i) => {
    return Number(i);
  });

const list = input.sort((a, b) => a - b);
list.unshift(0);
list.push(list[list.length - 1] + 3);

function joltageHops(arr) {
  let result = [];
  let acc = 0;
  arr.forEach((element, index) => {
    let nextElement = element;
    if (index + 1 <= arr.length) nextElement = arr[index + 1];
    if (nextElement - element === 1) acc++;
    //if (nextElement - element === 2) joltHop2++;
    if (nextElement - element === 3) {
      result.push(acc);
      acc = 0;
    }
  });
  return result;
}

//console.log(joltageHops(list));
const jumpsArr = joltageHops(list);

const mapObj = {
  5: 13,
  4: 7,
  3: 4,
  2: 2,
  1: 1,
  0: 1,
};

function calcCombinations(arr) {
  return arr.reduce((acc, next) => {
    return (acc *= mapObj[next]);
  }, 1);
}

console.log(calcCombinations(jumpsArr));
