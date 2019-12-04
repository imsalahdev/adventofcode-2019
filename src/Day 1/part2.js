const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
  path.resolve(__dirname, "part2_input.txt"),
  "UTF-8"
);

const requiredFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel <= 0) {
    return 0;
  }
  return fuel + requiredFuel(fuel);
};


const result = input
  .split("\n")
  .reduce((totalFuel, currentMass) => totalFuel + requiredFuel(Number(currentMass)), 0);

console.log(result);
