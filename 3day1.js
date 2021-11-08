const fs = require("fs");
const inputString = fs.readFileSync("./3dayinput.txt").toString().split("\n");
//const inputString = fs.readFileSync("./test.txt").toString().split("\n");

//const input = inputString.map((n) => Array(n));
const input = inputString.map((n) => n.split(""));
//console.log(input);

function countTrees(input) {
  let count = 0;
  let len = input[0].length;

  for (let i = 0; i < input.length; i++) {
    let j = 3 * i;
    while (j > len - 1) {
      j = j - len;
    }

    if (input[i][j] == "#") count++;

    //console.log("i:", i, "and j:", j, "count:", count);
  }
  //console.log(count);
  return count;
}
console.log(countTrees(input));
