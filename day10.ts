import stdout = Deno.stdout;

let X = 1, cycle = 0, sums: Array<number> = []
const add = /addx/g
const noOp = /noop/g
const number = /-?[0-9]+/g

Deno.readTextFile("day10.txt").then(input => {
    const lines = input.split("\n")
    // part1(lines);
    part2(lines);
})

function part2(lines: string[]) {
    lines.forEach(line => {
        if (line.match(add)) {
            const numberToAdd = Number(line.match(number)[0])
            cycle++;
            drawPixel()
            cycle++
            drawPixel()
            X += numberToAdd;
        } else if (line.match(noOp)) {
            cycle++;
            drawPixel()
        }
    })
}

function drawPixel() {
    const screenPosition = (cycle-1)%40

    if (screenPosition == 0) {
        Deno.writeAllSync( stdout, new TextEncoder().encode("\n"));
    }
    if (X >= 0 && screenPosition == X || screenPosition-1 == X || screenPosition+1 == X) {
        Deno.writeAllSync(stdout, new TextEncoder().encode("#"))
    } else {
        Deno.writeAllSync(stdout, new TextEncoder().encode("."))
    }
}

function part1(lines: string[]) {
    lines.forEach(line => {
        if (line.match(add)) {
            const numberToAdd = Number(line.match(number)[0])
            cycle++;
            checkCycle()
            cycle++
            checkCycle()
            X += numberToAdd;
        } else if (line.match(noOp)) {
            cycle++;
            checkCycle()
        }
    })

    console.log(sums.reduce((previousValue, currentValue) => previousValue + currentValue, 0))
}

function checkCycle() {
    switch (cycle) {
        case 20: resetRegister(); break;
        case 60: resetRegister(); break;
        case 100: resetRegister(); break;
        case 140: resetRegister(); break;
        case 180: resetRegister(); break;
        case 220: resetRegister(); break;
    }
}

function resetRegister() {
    const signalStrength = cycle*X;
    console.log(cycle + ": " + signalStrength)
    sums.push(signalStrength);
}
