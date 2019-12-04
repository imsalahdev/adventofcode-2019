const path = require("path");
const fs = require("fs");

const requiredFuel = mass => Math.floor(mass / 3) - 2;

const input = fs.readFileSync(path.resolve(__dirname, "part1_input.txt"), "UTF-8");
const result = input
  .split("\n")
  .reduce((totalFuel, currentMass) => totalFuel + requiredFuel(Number(currentMass)), 0);

console.log(result);
