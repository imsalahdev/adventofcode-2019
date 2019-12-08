const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part2_input.txt"),
    "UTF-8"
);

const IMAGE_DATA = input.split("");
const WIDTH = 25;
const HEIGHT = 6;
const LAYERS = Array.from({ length: IMAGE_DATA.length / (WIDTH * HEIGHT) }, (_, i) => IMAGE_DATA.slice(i * WIDTH * HEIGHT, (i + 1) * WIDTH * HEIGHT));

const mergeLayers = LAYERS => {
    const mergedLayer = [];
    for (let j = 0; j < WIDTH * HEIGHT; j++) {
        for (let i = 0; i < LAYERS.length; i++) {
            const pixel = LAYERS[i][j];
            if (pixel === "0" || pixel === "1") {
                mergedLayer.push(pixel);
                break;
            }
        }
    }
    return mergedLayer;
};

const result = mergeLayers(LAYERS);
console.log(result);