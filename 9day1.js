const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const input = fs
  .readFileSync("./9dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n")
  .map((i) => {
    return Number(i);
  });

function createSubArr(arr, min, max) {
  return arr.filter((i, index) => {
    return index < max && index >= min;
  });
}

function findDiff(arr1, arr2) {
  const result = arr1.filter((num) => {
    return arr2.indexOf(num) == -1;
  });
  return result[0];
}

function findFlaw(input, preamble) {
  let result = [];
  for (let i = preamble; i < input.length; i++) {
    let subArr = createSubArr(input, i - preamble, i)
      .sort((a, b) => a - b)
      .filter((e) => e < input[i]);

    for (let k = 0; k < subArr.length - 1; k++) {
      for (let j = k + 1; j < subArr.length; j++) {
        if (subArr[k] + subArr[j] == input[i]) {
          result.push(input[i]);
        }
      }
    }
  }
  return findDiff(input.slice(preamble), result);
}

console.log(findFlaw(input, 25));
