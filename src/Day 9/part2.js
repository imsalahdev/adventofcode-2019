const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(
    path.resolve(__dirname, "part2_input.txt"),
    "UTF-8"
);

const MODE = {
    POSITION_MODE: 0,
    IMMEDIATE_MODE: 1,
    RELATIVE_MODE: 2
};

const OPCODE = {
    ADD: 1,
    MULT: 2,
    IN: 3,
    OUT: 4,
    JIT: 5,
    JIF: 6,
    LT: 7,
    EQ: 8,
    RBO: 9,
    HALT: 99
};

class Computer {
    constructor(program, inputs) {
        this.program = program.slice();
        this.inputs = inputs;
        this.outputs = [];
        this.pointer = 0;
        this.relativeBase = 0;
    }

    parseCommand() {
        const instruction = this.program[this.pointer].toString();
        const [E = 0, D = 0, C = 0, B = 0, A = 0] = [...instruction].reverse();
        return {
            opcode: Number(D + E),
            modes: { A: Number(A), B: Number(B), C: Number(C) }
        };
    }

    operations(opcode) {
        return {
            [OPCODE.ADD]: ([a, b, address] = []) => {
                this.program[address] = a + b;
                this.pointer += 4;
            },
            [OPCODE.MULT]: ([a, b, address] = []) => {
                this.program[address] = a * b;
                this.pointer += 4;
            },
            [OPCODE.IN]: (_, { C } = {}) => {
                let position = this.getPositionByMode(this.program[this.pointer + 1], C);
                this.program[position] = this.inputs.shift();
                this.pointer += 2;
            },
            [OPCODE.OUT]: ([a] = []) => {
                this.outputs.push(a);
                this.pointer += 2;
            },
            [OPCODE.JIT]: ([a, b] = []) => {
                this.pointer += 3;
                if (a !== 0) {
                    this.pointer = b;
                }
            },
            [OPCODE.JIF]: ([a, b] = []) => {
                this.pointer += 3;
                if (a === 0) {
                    this.pointer = b;
                }
            },
            [OPCODE.LT]: ([a, b, address] = []) => {
                this.program[address] = (a < b) ? 1 : 0;
                this.pointer += 4;
            },
            [OPCODE.EQ]: ([a, b, address] = []) => {
                this.program[address] = (a === b) ? 1 : 0;
                this.pointer += 4;
            },
            [OPCODE.RBO]: ([a] = []) => {
                this.relativeBase += a;
                this.pointer += 2;
            },
            [OPCODE.HALT]: () => -1
        }[opcode];
    }

    getValueByMode(input, mode) {
        return {
            [MODE.POSITION_MODE]: this.program[input],
            [MODE.IMMEDIATE_MODE]: input,
            [MODE.RELATIVE_MODE]: this.program[input + this.relativeBase]
        }[mode];
    }

    getPositionByMode(input, mode) {
        return {
            [MODE.POSITION_MODE]: input,
            [MODE.RELATIVE_MODE]: input + this.relativeBase
        }[mode];
    }

    parseParameters({ A, B, C } = {}) {
        let [a, b, address] = this.program.slice(this.pointer + 1, this.pointer + 4);
        a = this.getValueByMode(a, C);
        b = this.getValueByMode(b, B);
        address = this.getPositionByMode(address, A);
        return [a, b, address];
    }

    checkOperation(operation, opcode) {
        if (operation === undefined) {
            throw new Error(`unknown opcode: ${opcode}`);
        }
    }

    input(a) {
        this.inputs.push(a);
        this.run();
    }

    output() {
        return this.outputs;
    }

    run() {
        while (true) {
            const { opcode, modes } = this.parseCommand();
            const operation = this.operations(opcode);
            const parameters = this.parseParameters(modes);

            this.checkOperation(operation, opcode);

            const code = operation(parameters, modes);
            if (code === -1) break;
        }
    }
}

const program = input.split(",").map(Number);
const computer = new Computer(program, [2]);
computer.run();
const result = computer.output();
console.log(result);