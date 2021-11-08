const fs = require("fs");
const rows = fs.readFileSync("./4dayinput.txt").toString().split("\n\n");
//const inputString = fs.readFileSync("./test.txt").toString().split("\n");
const entries = rows
  .map((row) => row.replace(/\n/g, " "))
  .map((row) => row.replace(/\s/gi, ","));

//console.log(entries);

function isValid(entry) {
  return (
    entry.includes("byr") &&
    entry.includes("iyr") &&
    entry.includes("eyr") &&
    entry.includes("hgt") &&
    entry.includes("hcl") &&
    entry.includes("ecl") &&
    entry.includes("pid")
  );
}

function checkByr(entry) {
  let index = entry.search("byr") + 4;
  let year = Number(entry.substr(index, 4));
  return year >= 1920 && year <= 2002; //&&entry.charAt(index + 4) == "," &&;
}

function checkIyr(entry) {
  let index = entry.search("iyr") + 4;
  let year = Number(entry.substr(index, 4));
  return year >= 2010 && year <= 2020; //&&entry.charAt(index + 4) == ",";
}

function checkEyr(entry) {
  let index = entry.search("eyr") + 4;
  let year = Number(entry.substr(index, 4));
  return year >= 2020 && year <= 2030; //&&entry.charAt(index + 4) == "," ;
}

function checkHgt(entry) {
  let index = entry.search("hgt") + 4;
  let heightCm = Number(entry.substr(index, 3));
  let heightIn = Number(entry.substr(index, 2));
  return (
    (entry.substr(index + 3, 2) == "cm" &&
      heightCm >= 150 &&
      heightCm <= 193) ||
    (entry.substr(index + 2, 2) == "in" && heightIn >= 59 && heightIn <= 76)
  );
}

function checkHcl(entry) {
  let index = entry.search("hcl") + 4;
  let hex = entry.substr(index + 1, 6);
  let hash = entry.substr(index, 1);
  let regexValid = /[a-f]||[0-9]/gi;
  let regexInvalid = /[g-z]/gi;
  return hash == "#" && regexValid.test(hex) && !regexInvalid.test(hex);
}

function checkEcl(entry) {
  let index = entry.search("ecl") + 4;
  let col = entry.substr(index, 3);
  return (
    col == "amb" ||
    col == "blu" ||
    col == "brn" ||
    col == "gry" ||
    col == "grn" ||
    col == "hzl" ||
    col == "oth"
    //entry.charAt(index + 3) == ","
  );
}

function checkPid(entry) {
  let index = entry.search("pid") + 4;
  let num = entry.substr(index, 9);
  let regex = /\d/;
  return !isNaN(num) && !regex.test(entry.charAt(index + 9));
}

//should be 188 (239-51)
const validPassports = entries
  .filter((entry) => isValid(entry))
  .filter((entry) => checkByr(entry))
  .filter((entry) => checkIyr(entry))
  .filter((entry) => checkEyr(entry))
  .filter((entry) => checkHgt(entry))
  .filter((entry) => checkHcl(entry))
  .filter((entry) => checkEcl(entry))
  .filter((entry) => checkPid(entry));

console.log(validPassports.length);
//console.log(validPassports);
