const fs = require('fs');
const filename = 'day5.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    let stacks = [];
    let columns = Math.round(lines[0].length / 4);
    for (let i=0; i<=columns; i++) {
        stacks.push([])
    }
    lines.forEach(line => {
        if (line[0] === "[" || line[1] === " ") {
            for (let i = 0; i <= columns; i++) {
                let crate = line.substring(i * 4, (i + 1) * 4)[1];
                if (crate && crate !== " ") {
                    stacks[i].push(crate);
                }
            }
        }
    });
    // part1(lines, stacks);
    part2(lines, stacks);
});

function part1(lines, stacks) {
    lines.forEach(line => {
        // read commands like: move 3 from 1 to 3
        const commandsRegex = /move [0-9]+ from [0-9]+ to [0-9]+/g
        if (commandsRegex.test(line)) {
            // console.log(line);
            const commands = line.match(/[0-9]+/g)
            for (let i = 0; i<Number(commands[0]); i++) {
                const moveBox = stacks[Number(commands[1])-1].shift();
                stacks[Number(commands[2])-1].unshift(moveBox);
            }
        }
    });

    stacks.forEach(stack => process.stdout.write(stack.shift()));
}


function part2(lines, stacks) {
    lines.forEach(line => {
        // read commands like: move 3 from 1 to 3
        const commandsRegex = /move [0-9]+ from [0-9]+ to [0-9]+/g
        if (commandsRegex.test(line)) {
            // console.log(line);
            const commands = line.match(/[0-9]+/g)
            const moveBoxes = []
            for (let i = 0; i<Number(commands[0]); i++) {
                moveBoxes.push(stacks[Number(commands[1])-1].shift());
            }
            stacks[Number(commands[2])-1] = moveBoxes.concat(stacks[Number(commands[2])-1])
        }
    });

    stacks.forEach(stack => process.stdout.write(stack.shift()));
}