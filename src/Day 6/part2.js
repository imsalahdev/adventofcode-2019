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

const getOrbitsOfObject = (data, object) => {
    if (object === "COM") return ["COM"];
    return [object, ...getOrbitsOfObject(data, data[object])];
};

const getMinimumNumberOfOrbitalTransfers = (data, object1, object2) => {
    const object1Orbits = getOrbitsOfObject(data, object1);
    const object2Orbits = getOrbitsOfObject(data, object2);
    let crossedObject = null;
    for (const object of object1Orbits) {
        if (object2Orbits.includes(object)) {
            crossedObject = object;
            break;
        }
    }

    if (crossedObject) {
        return object1Orbits.indexOf(crossedObject) + object2Orbits.indexOf(crossedObject) - 2;
    }
};

const data = parseInput(input);
const result = getMinimumNumberOfOrbitalTransfers(data, "YOU", "SAN");
console.log(result);