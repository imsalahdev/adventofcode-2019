const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
  path.resolve(__dirname, "part1_input.txt"),
  "UTF-8"
);

const arr = input.split(",").map(Number);

const getFinalPosition = (arr, a, b) => {
  arr[1] = a;
  arr[2] = b;

  let i = 0;
  while (arr[i] !== 99) {
    const [a, b, c] = arr.slice(i + 1, i + 4);
    arr[c] = arr[i] === 1 ? arr[a] + arr[b] : arr[a] * arr[b];
    i += 4;
  }

  return arr[0];
};

console.log(getFinalPosition(arr, 12, 2))


module.exports = getFinalPosition;
