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
    if (obj.direction == "W" || obj.direction == "S") obj.num = -obj.num;
    return obj;
  });

function shipMove(arr) {
  let x = 0;
  let y = 0;
  const position = [0, 0];
  let xw = 10;
  let yw = 1;

  arr.forEach((e, index) => {
    if (e.direction == "E" || e.direction == "W") {
      xw += e.num;
    } else if (e.direction == "N" || e.direction == "S") {
      yw += e.num;
    } else if (e.direction == "F") {
      x += e.num * xw;
      y += e.num * yw;
    } else if (e.direction == "R") {
      if (e.num == 90) {
        let temp = xw;
        xw = yw;
        yw = -temp;
      } else if (e.num == 180) {
        xw = -xw;
        yw = -yw;
      } else if (e.num == 270) {
        let temp = xw;
        xw = -yw;
        yw = temp;
      }
    } else {
      if (e.num == 270) {
        let temp = xw;
        xw = yw;
        yw = -temp;
      } else if (e.num == 180) {
        xw = -xw;
        yw = -yw;
      } else if (e.num == 90) {
        let temp = xw;
        xw = -yw;
        yw = temp;
      }
    }
  });
  position[0] = x;
  position[1] = y;
  return Math.abs(position[0]) + Math.abs(position[1]);
}
console.log(shipMove(input)); //89984
