const fs = require("fs");

const input = fs
  .readFileSync("./14dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n");

//create array to store the mem after comparison with mask
let checkedMem = [];

//organize input
function prepareInput(str) {
  let obj = {};
  if (str.substring(0, 3) == "mas") {
    obj.mask = str.split("").slice(7);
  } else {
    str = str.replace("mem[", "").split("] = ");
    obj.mem = Number(str[0]);
    obj.num = str[1];
  }
  return obj;
}

function compare(mask, mem) {
  //add leading zeroes for shorter mem arrays
  while (mem.length < mask.length) {
    mem.unshift(0);
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
    if (mask[ind] != "0") mem[ind] = mask[ind];
    return mem[ind];
  });
  const result = preMem + comparedArr.join("");
  return result;
}

function replaceX(str, n) {
  let arr = [str];
  let xIndex = arr[0].indexOf("X");

  arr.push(str.substring(0, xIndex) + 1 + str.substring(xIndex + 1));
  arr.push(str.substring(0, xIndex) + 0 + str.substring(xIndex + 1));
  arr.shift();

  for (let i = 0; i < arr.length; i++) {
    if (arr[0].indexOf("X") > -1) {
      xIndex = arr[0].indexOf("X");
      arr.push(arr[0].substring(0, xIndex) + 1 + arr[0].substring(xIndex + 1));
      arr.push(arr[0].substring(0, xIndex) + 0 + arr[0].substring(xIndex + 1));
      arr.shift();
    } else {
      i++;
    }
  }

  return arr.map((e) => {
    obj = {
      mem: bin2dec(e),
      num: n,
    };
    return obj;
  });
}

function checkDuplicate(otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.mem == current.mem;
      }).length == 0
    );
  };
}

function initialization(input) {
  let maskArr = [];
  let memArr = [];
  input.map((line) => {
    //prepare the input line
    let processedLine = prepareInput(line);

    if (processedLine.mask) {
      //if line is a mask -> it is stored in the maskArr
      maskArr = processedLine.mask;
    } else {
      //if line is mem -> it is compared to mask
      memMem = dec2bin(processedLine.mem);
      memArr = memMem.split("");
      let newmemNum = compare(maskArr, memArr); //returns a string containing "X"s
      //converts the Xs with 0 an 1 which returns an array of dec paired with the processedline num
      let newmemNums = replaceX(newmemNum, processedLine.num);

      // eliminate mem that already exists and then concat the newmemNums
      checkedMem = checkedMem
        .filter(checkDuplicate(newmemNums))
        .concat(newmemNums);
    }
  });
  return checkedMem;
}

let resultArr = initialization(input);
let result = resultArr.reduce((acc, next) => {
  return acc + Number(next.num);
}, 0);
console.log(result);

//************************* */
//converts bin into dec
function bin2dec(bin) {
  return parseInt(bin, 2).toString(10);
}

//converts dec into bin
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}
