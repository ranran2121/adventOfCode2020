const fs = require("fs");

const input = fs
  .readFileSync("./11dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n")
  .map((i) => i.split(""));

const coefficients = [-input.length, 0, input.length];
const right = [];
for (let i = 0; i < input.length; i++) right.push(i);
const left = [];
for (let i = 0; i > -input.length; i--) left.push(i);

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
        //check toplefydiagonal
        for (const x of left) {
          let y = x;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }
        //check bottomleftdiagonal
        for (const x of left) {
          let y = -x;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }
        //check toprightdiagonal
        for (const x of right) {
          let y = -x;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }

        //check bottomrightdiagonal
        for (const x of right) {
          let y = x;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }
        //check top
        for (const x of left) {
          let y = 0;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }

        //check bottom
        for (const x of right) {
          let y = 0;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }

        //check left
        for (const y of left) {
          let x = 0;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }

        //check right
        for (const y of right) {
          let x = 0;
          if (x === 0 && y === 0) {
            continue; //skips one iteration of the loop -> it goes to x=0 and y =1
          }
          if (oldArray[i + x] && oldArray[i + x][j + y] === "#") {
            nearSeatsCount++;
            break;
          } else if (oldArray[i + x] && oldArray[i + x][j + y] === "L") {
            break;
          }
        }

        if (nearSeatsCount === 0 && ["L", "#"].includes(oldArray[i][j])) {
          newArray[i][j] = "#";
        } else if (nearSeatsCount >= 5 && oldArray[i][j] === "#") {
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
