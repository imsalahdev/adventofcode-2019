const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part1_input.txt"),
    "UTF-8"
);

const parseInput = input => {
    return input.split("\r\n").reduce((parsedConnections, currentConnection) => {
        const [A, B] = currentConnection.split(")");
        parsedConnections[B] = A;
        return parsedConnections;
    }, {});
};

const getTotalOrbitsOfObject = (data, object) => {
    if (object === "COM") return 0;
    return 1 + getTotalOrbitsOfObject(data, data[object]);
};

const data = parseInput(input);
const getTotalOrbits = data => Object.keys(data).reduce((total, current) => total + getTotalOrbitsOfObject(data, current), 0);

console.log(getTotalOrbits(data));