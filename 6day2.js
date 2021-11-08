const fs = require("fs");
const input = fs.readFileSync("./6dayinput.txt").toString().split("\n\n");
//const input = fs.readFileSync("./test.txt").toString().split("\n\n");
const groups = input
  .map((group) => group.replace(/\n/g, ","))
  .map((group) => group.split(","));

function scanGroup(group) {
  let answer = 0;
  if (group.length == 1) answer = +group[0].length;
  else {
    const obj = {};
    for (letter of group[0]) {
      obj[letter] = 0;
    }
    const answers = group.reduce((acc, next) => {
      for (let i = 0; i < next.length; i++) {
        for (key in acc) {
          if (key == next[i]) acc[key]++;
        }
      }
      return acc;
    }, obj);
    for (key in obj) {
      if (obj[key] == group.length) answer++;
    }
  }
  return answer;
}

const count = groups
  .map((group) => scanGroup(group))
  .reduce((acc, next) => (acc = acc + next));
console.log(count);
