const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part1_input.txt"),
    "UTF-8"
);

const map = input.split`\r\n`;

let pSize = 0;
let bestLoc = null;
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
                bestLoc = {x, y};
                pSize = angles.size;
            }
        }
    }
}

console.log(bestLoc);