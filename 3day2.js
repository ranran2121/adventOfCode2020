const fs = require("fs");
const inputString = fs.readFileSync("./3dayinput.txt").toString().split("\n");
//const inputString = fs.readFileSync("./test.txt").toString().split("\n");

const input = inputString.map((n) => n.split(""));

function countTrees(input, right, down) {
  let count = 0;
  let len = input[0].length;

  for (let i = 0; i < input.length; i += down) {
    let j = (right * i) / down;
    while (j > len - 1) {
      j = j - len;
    }

    if (input[i][j] == "#") count++;
  }

  return count;
}

const r1d1 = countTrees(input, 1, 1);
console.log(r1d1);
const r3d1 = countTrees(input, 3, 1);
console.log(r3d1);
const r5d1 = countTrees(input, 5, 1);
console.log(r5d1);
const r7d1 = countTrees(input, 7, 1);
console.log(r7d1);
const r1d2 = countTrees(input, 1, 2);
console.log(r1d2);
console.log(r1d1 * r1d2 * r3d1 * r5d1 * r7d1);
