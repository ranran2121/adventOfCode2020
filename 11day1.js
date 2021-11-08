const fs = require("fs");

const input = fs
  .readFileSync("./11dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n")
  .map((i) => i.split(""));

const coefficients = [-1, 0, 1];

function part1(input) {
  let oldArray = input;
  let newArray = input;
  do {
    oldArray = newArray;
    newArray = [];
    for (let i = 0; i < oldArray.length; i++) {
      newArray[i] = [];
      for (let j = 0; j < oldArray[0].length; j++) {
        let nearSeatsCount = 0;
        for (const x of coefficients) {
          for (const y of coefficients) {
            if (x === 0 && y === 0) {
              continue; //skips one iteration of the loop -> it goes to x=0 and y =1
            }
            if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
              nearSeatsCount++;
            }
          }
        }

        if (nearSeatsCount === 0 && ["L", "#"].includes(oldArray[i][j])) {
          newArray[i][j] = "#";
        } else if (nearSeatsCount >= 4 && oldArray[i][j] === "#") {
          newArray[i][j] = "L";
        } else {
          newArray[i][j] = oldArray[i][j];
        }
      }
    }
  } while (!compareArrays(oldArray, newArray));

  return count(newArray, "#");
}

function compareArrays(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[0].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function count(array, symbol) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      if (array[i][j] === symbol) {
        sum++;
      }
    }
  }

  return sum;
}

console.log(part1(input));
