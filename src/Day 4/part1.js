const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
  path.resolve(__dirname, "part1_input.txt"),
  "UTF-8"
);

const [start, end] = input.split("-").map(Number);

const isAdjacent = num => /(\d)\1/.test(num);

const neverDecrease = num => {
  const str = num.toString();
  for (let i = 1; i < str.length; i++) {
    if (str[i] < str[i - 1]) {
      return false;
    }
  }
  return true;
};

let count = 0;
for (let i = start; i < end; i++) {
  if (neverDecrease(i) && isAdjacent(i)) {
    count++;
  }
}

console.log(count);
