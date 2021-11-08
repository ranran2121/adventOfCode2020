//for working in chrom dev tools
// Get each ID separated by new line space
//const rows = $('pre').innerText.split('\n')
//etc....

const fs = require("fs");
const input = fs.readFileSync("./5dayinput.txt").toString().split("\n");
//const inputString = fs.readFileSync("./test.txt").toString().split("\n");
const entries = input.map((row) => row.split(""));

let rows = [];
for (let i = 0; i < 128; i++) rows.push(i);
let columns = [];
for (let i = 0; i < 8; i++) columns.push(i);

function findRow(arr) {
  let rowsArr = rows;
  for (let i = 0; i < 8; i++) {
    half = rowsArr.length / 2;

    if (arr[i] == "F") rowsArr = rowsArr.slice(0, half);
    else if (arr[i] == "B") rowsArr = rowsArr.slice(half, rowsArr.length);
  }
  return rowsArr[0];
}

function findColumn(arr) {
  let columnArr = columns;
  for (let c = 0; c < 3; c++) {
    half = columnArr.length / 2;

    if (arr[c] == "L") columnArr = columnArr.slice(0, half);
    else if (arr[c] == "R") columnArr = columnArr.slice(half, columnArr.length);
  }
  return columnArr[0];
}

function findSeat(arr) {
  let row = findRow(arr.slice(0, 7));
  let col = findColumn(arr.slice(7));
  return row * 8 + col;
}

let ids = entries
  .map((entry) => findSeat(entry))
  .reduce((acc, next) => {
    let max = acc;
    if (next > max) {
      max = next;
      acc = max;
    }
    return acc;
  });

console.log(ids);
