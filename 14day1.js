const fs = require("fs");

const input = fs
  .readFileSync("./14dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n");

//create array to store the mem after comaprison with mask
let checkedMem = [];

//organize input
function prepareInput(str) {
  let obj = {};
  if (str.substring(0, 4) == "mask") {
    obj.mask = str.split("").slice(7);
  } else {
    str = str.replace("mem[", "").split("] = ");
    obj.mem = str[0];
    obj.num = Number(str[1]);
  }
  return obj;
}

function compare(mask, mem) {
  //add leading zeroes for shorter mem arrays
  while (mem.length < mask.length) {
    mem.unshift("0");
  }
  //cut and store the mem array in case in case it is longer
  let preMem = "";
  if (mem.length > mask.length) {
    let diff = mem.length - mask.length;
    preMem = mem.slice(0, diff).join("");
    mem = mem.slice(diff);
  }
  //compare
  const comparedArr = mem.map((b, ind) => {
    if (mask[ind] != "X") mem[ind] = mask[ind];
    return mem[ind];
  });
  const result = preMem + comparedArr.join("");
  //convert to dec
  return bin2dec(result);
}

function initialization(input) {
  let maskArr = [];
  let memArr = [];
  input.map((line) => {
    //prepare the input line
    let processedLine = prepareInput(line);

    if (processedLine.mask) {
      //line is a mask -> it is stored in the maskArr
      maskArr = processedLine.mask;
    } else {
      // line is mem -> it is compared to mask
      memNum = dec2bin(processedLine.num);
      memArr = memNum.split("");
      let newmemNum = compare(maskArr, memArr);

      if (newmemNum != 0) {
        // check if that mem already exist in the array, if so it updates it
        checkedMem = checkedMem.filter(({ mem, num }) => {
          return mem != processedLine.mem;
        });
        checkedMem.push({ mem: processedLine.mem, num: Number(newmemNum) });
      }
    }
  });
  return checkedMem;
}

let resultArr = initialization(input);
let result = resultArr.reduce((acc, next) => {
  return acc + next.num;
}, 0);
console.log(result);

//************************************ */
//converts bin into dec
function bin2dec(bin) {
  return parseInt(bin, 2).toString(10);
}

//converts dec into bin
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}
