const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
  path.resolve(__dirname, "part2_input.txt"),
  "UTF-8"
);

const getPath = wire => {
  let x = 0;
  let y = 0;
  return wire
    .split(",")
    .map(e => {
      const location = e[0];
      const step = Number(e.slice(1));
      const arr = [];
      for (let i = 1; i <= step; i++) {
        switch (location) {
          case "R":
            arr.push([(x += 1), y]);
            break;
          case "L":
            arr.push([(x -= 1), y]);
            break;
          case "U":
            arr.push([x, (y += 1)]);
            break;
          case "D":
            arr.push([x, (y -= 1)]);
            break;
        }
      }
      return arr;
    })
    .flat();
};

const [firstWire, secondWire] = input.split("\n");

const firstWirePath = getPath(firstWire);
const secondWirePath = getPath(secondWire);

const crossLocations = firstWirePath.filter(([x1, y1]) => {
  return secondWirePath.some(([x2, y2]) => x1 === x2 && y1 === y2);
});

const getWireSum = (wirePath, [x, y]) => {
  for (let i = 0; i < wirePath.length; i++) {
    const [x1, y1] = wirePath[i];
    if (x === x1 && y === y1) {
      return i + 1;
    }
  }
};

const combinedSteps = crossLocations.map(location => {
  return (
    getWireSum(firstWirePath, location) + getWireSum(secondWirePath, location)
  );
});

const result = Math.min(...combinedSteps);

console.log(result);
