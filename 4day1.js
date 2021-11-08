const fs = require("fs");
const rows = fs.readFileSync("./4dayinput.txt").toString().split("\n\n");
//const inputString = fs.readFileSync("./test.txt").toString().split("\n");
const entries = rows.map((row) => row.replace(/\n/g, " "));

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

const validPassports = entries.filter((entry) => isValid(entry));
console.log(validPassports.length);
