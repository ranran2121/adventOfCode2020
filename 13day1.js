const fs = require("fs");

const input = fs
  .readFileSync("./13dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n");

const busArr = input[1].split(",").filter((i) => i != "x");
const timestamp = input[0];
console.log(busArr, timestamp);

function findBus(arr, num) {
  let timeTowait = arr.map((bus) => {
    return (bus -= num % bus);
  });
  let minTimeTowait = Math.min(...timeTowait);
  let busId = arr[timeTowait.indexOf(minTimeTowait)];
  return busId * minTimeTowait;
}

console.log(findBus(busArr, timestamp));
