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
    const answers = group.reduce((acc, next) => {
      for (let i = 0; i < next.length; i++) {
        if (!acc.includes(next.charAt(i))) {
          acc = acc.concat(next.charAt(i));
        }
      }
      return acc;
    });
    answer = +answers.length;
  }
  return answer;
}

const count = groups
  .map((group) => scanGroup(group))
  .reduce((acc, next) => (acc = acc + next));
console.log(count);
