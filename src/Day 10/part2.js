const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part2_input.txt"),
    "UTF-8"
);

const map = input.split`\r\n`;

let station = null;
let pSize = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === "#") {
            let angles = new Set();
            for (let y1 = 0; y1 < map.length; y1++) {
                for (let x1 = 0; x1 < map[0].length; x1++) {
                    if ((x !== x1 || y !== y1) && map[y1][x1] === "#") {
                        angles.add(Math.atan2(y - y1, x - x1))
                    }
                }
            }
            if (pSize < angles.size) {
                station = {x, y};
                pSize = angles.size;
            }
        }
    }
}

let dict = {};
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if ((station.x !== x || station.y !== y) && map[y][x] === "#") {
            let angleBetween = (Math.atan2(station.y - y, station.x - x) * 180 / Math.PI + 180 + 90) % 360;
            if (!dict[angleBetween]) {
                dict[angleBetween] = [];
            }
            dict[angleBetween].push({x, y});
        }
    }
}

let sortedPositions = Object.keys(dict).map(Number).sort((a, b) => a - b).map(key => dict[key].sort((a, b) => Math.hypot(station.y - a.y, station.x - a.x) - Math.hypot(station.y - b.y, station.x - b.x)));

let i = 0;
let toBeVaporized = [];
while (sortedPositions.length !== 0) {
    const position = sortedPositions[i].shift();
    if (position == undefined) {
        sortedPositions.splice(i, 1);
    } else {
        toBeVaporized.push(position);
        i++;
    }
    i %= sortedPositions.length;
}

console.log(toBeVaporized[199].x * 100 + toBeVaporized[199].y);