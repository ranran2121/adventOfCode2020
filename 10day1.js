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
  let joltHop1 = 0;
  let joltHop2 = 0;
  let joltHop3 = 0;
  const result = arr.forEach((element, index) => {
    let nextElement = element;
    if (index + 1 <= arr.length) nextElement = arr[index + 1];
    if (nextElement - element === 1) joltHop1++;
    if (nextElement - element === 2) joltHop2++;
    if (nextElement - element === 3) joltHop3++;
  });
  console.log(joltHop1, joltHop2, joltHop3);
  return joltHop1 * joltHop3;
}

console.log(joltageHops(list));
