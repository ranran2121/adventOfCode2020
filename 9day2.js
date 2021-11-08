const fs = require("fs");

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

let flaw = findFlaw(input, 25);
//creo questo array perchè sicuramente gli addendi saranno minori
const arrForFlaw = input.filter(
  (num, index) => num < flaw && index < input[input.indexOf(flaw)]
);

/* const flawSubset = arrForFlaw.filter((num, index) => {
  let indexAcc = index + 1;
  let acc = num;
  //let min = 0;
  //let max = 0;
  while (indexAcc <= arrForFlaw.length) {
    acc += arrForFlaw[indexAcc];
    if (acc == flaw) {
      let min = index;
      let max = indexAcc;
      //console.log("min", min);
      //console.log("max", max);
      return index == 5;
    }
    indexAcc++;
  }
});
console.log(flawSubset); */

function findFlawAddends(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let indexAcc = i + 1;
    let acc = arr[i];
    let result = [];
    while (indexAcc <= arr.length) {
      acc += arr[indexAcc];
      if (acc == flaw) {
        return arr.filter((num, ind) => {
          return ind >= i && ind <= indexAcc;
        });
      }
      indexAcc++;
    }
  }
}

const flawAddends = findFlawAddends(arrForFlaw);

function findWeakness(arr) {
  arr.sort((a, b) => a - b);
  return arr[arr.length - 1] + arr[0];
}
console.log(findWeakness(flawAddends)); //31580383
