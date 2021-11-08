const fs = require("fs");

const input = fs
  .readFileSync("./12dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n");

function part1(input) {
  const directions = ["E", "S", "W", "N"];
  let x = 0,
    y = 0,
    direction = 0;
  for (const line of input) {
    const order = line[0];
    const value = parseInt(line.substring(1));

    const makeMove = (dir) => {
      switch (dir) {
        case "N":
          y += value;
          return;
        case "S":
          y -= value;
          return;
        case "W":
          x -= value;
          return;
        case "E":
          x += value;
          return;
        case "L":
          direction = mod(direction - value / 90, 4);
          return;
        case "R":
          direction = mod(direction + value / 90, 4);
          return;
        case "F":
          makeMove(directions[direction]);
          return;
        default:
          console.log(`Something wrong: ${direction}`);
      }
    };
    console.log(line, x, y);
    makeMove(order);
  }

  return Math.abs(x) + Math.abs(y);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

console.log(part1(input));
