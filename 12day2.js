const fs = require("fs");

const input = fs
  .readFileSync("./12dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n")
  .map((i) => {
    const obj = {};
    obj.direction = i.substr(0, 1);
    obj.num = Number(i.substr(1));
    if (obj.direction == "W" || obj.direction == "S" || obj.direction == "L")
      obj.num = -obj.num;
    return obj;
  });

const ref = ["E", "S", "W", "N"];

function shipMove(arr) {
  let x = 0;
  let y = 0;
  const position = [0, 0];

  let prevDirection = "E";

  arr.forEach((e, index) => {
    if (e.direction == "E" || e.direction == "W") {
      x += e.num;
    } else if (e.direction == "N" || e.direction == "S") {
      y += e.num;
    } else if (e.direction == "F") {
      if (prevDirection == "E") x += e.num;
      else if (prevDirection == "W") x -= e.num;
      else if (prevDirection == "N") y += e.num;
      else y -= e.num;
    } else if (e.direction == "R") {
      let currentInd = ref.indexOf(prevDirection);
      currentInd = currentInd + e.num / 90;
      if (currentInd >= ref.length) currentInd = currentInd - ref.length;
      prevDirection = ref[currentInd];
    } else {
      let currentInd = ref.indexOf(prevDirection);
      currentInd += e.num / 90;
      if (currentInd < 0) currentInd = ref.length + currentInd;
      prevDirection = ref[currentInd];
      console.log("l", prevDirection);
    }
  });
  position[0] = x;
  position[1] = y;
  return Math.abs(position[0]) + Math.abs(position[1]);
}
console.log(shipMove(input));
