const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part1_input.txt"),
    "UTF-8"
);

class Computer {
    constructor(program, inputs) {
        this.program = program;
        this.inputs = inputs;
        this.pointer = 0;
        this.programOutput = null;
    }

    parseCommand() {
        const instruction = this.program[this.pointer].toString();
        const [E = "0", D = "0", C = "0", B = "0", A = "0"] = [...instruction].reverse();
        return {
            opcode: Number(D + E).toString(),
            modes: { A, B, C }
        };
    }

    operations(opcode) {
        return {
            "1": ([a, b, o] = []) => { // ADD
                this.program[o] = a + b;
                this.pointer += 4;
            },
            "2": ([a, b, o] = []) => { // MULT
                this.program[o] = a * b;
                this.pointer += 4;
            },
            "3": () => { // INPUT
                const address = this.program[this.pointer + 1];
                this.program[address] = this.inputs.shift();
                this.pointer += 2;
            },
            "4": () => { // OUTPUT
                const address = this.program[this.pointer + 1];
                this.programOutput = this.program[address];
                this.pointer += 2;
            },
            "5": ([a, b] = []) => { // JUMP IF TRUE
                this.pointer += 3;
                if (a !== 0) {
                    this.pointer = b;
                }
            },
            "6": ([a, b] = []) => { // JUMP IF FALSE
                this.pointer += 3;
                if (a === 0) {
                    this.pointer = b;
                }
            },
            "7": ([a, b, o] = []) => { // LESS THAN
                this.program[o] = (a < b) ? 1 : 0;
                this.pointer += 4;
            },
            "8": ([a, b, o] = []) => { // EQUALS
                this.program[o] = (a === b) ? 1 : 0;
                this.pointer += 4;
            },
            "99": () => -1 // HALT
        }[opcode];
    }

    getValueByMode(input, mode) {
        return (mode === "0") ? this.program[input] : input;
    }

    parseParameters({A, B, C} = {}) {
        let [a, b, o] = this.program.slice(this.pointer + 1, this.pointer + 4);
        a = this.getValueByMode(a, C);
        b = this.getValueByMode(b, B);
        return [a, b, o];
    }

    checkOperation(operation, opcode) {
        if(operation === undefined) {
            throw new Error(`unknown opcode: ${opcode}`);
        }
    }

    run() {
        while (true) {
            const { opcode, modes } = this.parseCommand();
            const operation = this.operations(opcode);
            const parameters = this.parseParameters(modes);
            
            this.checkOperation(operation, opcode);

            const code = operation(parameters);
            
            if (code === -1) break;
        }
        return this.programOutput;
    }
}

const getCombinations = numbers => numbers.length === 1 ? [numbers] : numbers.flatMap(n => getCombinations(numbers.filter(x => x !== n)).map(x => [n, ...x]));

const getTheHighestSignalThatCanBeSentToTheThrusters = program => {
    let max = -Infinity;
    let combinations = getCombinations([0, 1, 2, 3, 4]);
    for (const combination of combinations) {
        let inputSignal = 0;
        for (const phaseSetting of combination) {
            const computer = new Computer(program, [phaseSetting, inputSignal]);
            inputSignal = computer.run();
        }

        if (inputSignal > max) {
            max = inputSignal;
        }
    }
    return max;
};

const program = input.split(",").map(Number);
const result = getTheHighestSignalThatCanBeSentToTheThrusters(program);
console.log(result);