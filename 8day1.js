const fs = require("fs");
const input = fs
  //.readFileSync("./8dayinput.txt")
  .readFileSync("./8test.txt")
  .toString()
  .split("\n")
  .map((i) => {
    let command = i.substr(0, 3);
    let move = Number(i.substr(4));
    let obj = {};
    obj[command] = move;
    obj["count"] = 0;
    return obj;
  });

function scanInput(input) {
  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i].count == 0) {
      input[i].count = 1;
      if (input[i].nop) acc = acc;
      else if (input[i].acc) acc = acc + input[i].acc;
      else if (input[i].jmp) i = i + input[i].jmp - 1;
    } else {
      break;
    }
  }
  return acc;
}

console.log(scanInput(input));
