const path = require("path");
const fs = require("fs");
const getFinalPosition = require("./part1");

const input = fs.readFileSync(
  path.resolve(__dirname, "part2_input.txt"),
  "UTF-8"
);

const numbers = input.split(",").map(Number);

const getTheMagicalNumbers = () => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (getFinalPosition(numbers.slice(0), i, j) === 19690720) {
        return [i, j];
      }
    }
  }
};

console.log(getTheMagicalNumbers());
