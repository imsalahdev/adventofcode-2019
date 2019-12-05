const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part1_input.txt"),
    "UTF-8"
);

const instructions = input.split(",").map(Number);

const getDiagnosticCode = instructions => {
    let diagnosticCode = null,
        i = 0;
    while (instructions[i] !== 99) {
        const instruction = instructions[i].toString();
        const opcode = instruction[instruction.length - 1];
        const parameterModes = instruction.slice(0, instruction.length - 2);
        const [C = "0", B = "0", A = "0"] = [...parameterModes].reverse();
        if (opcode === "1" || opcode === "2") {
            const [input1, input2, output] = instructions.slice(i + 1, i + 4);
            const a = (C === "0") ? instructions[input1] : input1;
            const b = (B === "0") ? instructions[input2] : input2;
            instructions[output] = (opcode === "1") ? (a + b) : (a * b);
            i += 4;
        } else if (opcode === "3") {
            instructions[instructions[i + 1]] = 1;
            i += 2;
        } else if (opcode === "4") {
            if (A === "0") {
                diagnosticCode = instructions[instructions[i + 1]];
            }
            i += 2;
        }
    }
    return diagnosticCode;
};

const result = getDiagnosticCode(instructions);

console.log(result);