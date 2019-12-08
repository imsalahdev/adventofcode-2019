const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part1_input.txt"),
    "UTF-8"
);

const IMAGE_DATA = input.split("");
const WIDTH = 25;
const HEIGHT = 6;
const LAYERS = Array.from({ length:  IMAGE_DATA.length / (WIDTH * HEIGHT)}, (_, i) => IMAGE_DATA.slice(i * WIDTH * HEIGHT, (i + 1) * WIDTH * HEIGHT));

let min = Infinity;
let fewestZeroDigitsIndex = -Infinity;
LAYERS.forEach((layer, i) => {
    const numberOfZeros = layer.filter(e => e === "0").length;
    if (min > numberOfZeros) {
        min = numberOfZeros;
        fewestZeroDigitsIndex = i;
    }
});
console.log(LAYERS[fewestZeroDigitsIndex].filter(e => e === "1").length * LAYERS[fewestZeroDigitsIndex].filter(e => e === "2").length);