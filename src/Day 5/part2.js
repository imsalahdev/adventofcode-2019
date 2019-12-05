const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part2_input.txt"),
    "UTF-8"
);

const instructions = input.split(",").map(Number);

const getDiagnosticCode = instructions => {
    let diagnosticCode = null,
        instructionPointer = 0;
    while (instructions[instructionPointer] !== 99) {
        const instruction = instructions[instructionPointer].toString();
        const opcode = instruction[instruction.length - 1];
        const parameterModes = instruction.slice(0, instruction.length - 2);
        const [C = "0", B = "0", A = "0"] = [...parameterModes].reverse();
        let increaseBy = 0;
        if ("125678".includes(opcode)) {
            const [input1, input2, output] = instructions.slice(instructionPointer + 1, instructionPointer + 4);
            const a = (C === "0") ? instructions[input1] : input1;
            const b = (B === "0") ? instructions[input2] : input2;
            if (opcode === "1") {
                instructions[output] = a + b;
            } else if (opcode === "2") {
                instructions[output] = a * b;
            } else if (opcode === "5" || opcode === "6") {
                if ((opcode === "5") ? (a !== 0) : (a === 0)) {
                    instructionPointer = b;
                    continue;
                }
                increaseBy = -1;
            } else if (opcode === "7") {
                instructions[output] = (a < b) ? 1 : 0;
            } else if (opcode === "8") {
                instructions[output] = (a === b) ? 1 : 0;
            }
            increaseBy += 4;
        } else if (opcode === "3") {
            instructions[instructions[instructionPointer + 1]] = 5; // System ID
            increaseBy += 2;
        } else if (opcode === "4") {
            if (A === "0") {
                diagnosticCode = instructions[instructions[instructionPointer + 1]];
            }
            increaseBy += 2;
        }
        instructionPointer += increaseBy;
    }
    return diagnosticCode;
};

const result = getDiagnosticCode(instructions);

console.log(result);