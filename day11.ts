class Monkey {
    items: number[]
    operation: (old:number) => number
    tests: (divisible:number) => number
    inspections: number = 0
}

const monkeyRegex = /Monkey [0-9]+/g
const itemsRegex = /Starting items:/g
const operationRegex = /Operation:/g

Deno.readTextFile("day11.txt").then(input => {
    const lines = input.split("\n")

    let monkeys: Monkey[] = [];
    lines.forEach(line => {
        if (monkeyRegex.test(line)) {
            monkeys.push(new Monkey())
        }
        if (itemsRegex.test(line)) {
            monkeys[monkeys.length-1].items = line.match(/[0-9]+/g)
        }
    })

    // //demo
    // monkeys[0].operation = (old: number) => old * 19;
    // monkeys[1].operation = (old: number) => old + 6;
    // monkeys[2].operation = (old: number) => old * old;
    // monkeys[3].operation = (old: number) => old + 3;
    // monkeys[0].tests = (divisible: number) => divisible % 23 == 0 ? 2 : 3;
    // monkeys[1].tests = (divisible: number) => divisible % 19 == 0 ? 2 : 0;
    // monkeys[2].tests = (divisible: number) => divisible % 13 == 0 ? 1 : 3;
    // monkeys[3].tests = (divisible: number) => divisible % 17 == 0 ? 0 : 1;

    // operations, hardcoded
    monkeys[0].operation = (old: number) => old * 3;
    monkeys[1].operation = (old: number) => old * 17;
    monkeys[2].operation = (old: number) => old + 1;
    monkeys[3].operation = (old: number) => old + 2;
    monkeys[4].operation = (old: number) => old * old;
    monkeys[5].operation = (old: number) => old + 8;
    monkeys[6].operation = (old: number) => old + 6;
    monkeys[7].operation = (old: number) => old + 7;

    // tests hardcoded
    monkeys[0].tests = (divisible: number) => divisible % 7 == 0 ? 7 : 1;
    monkeys[1].tests = (divisible: number) => divisible % 19 == 0 ? 5 : 7;
    monkeys[2].tests = (divisible: number) => divisible % 13 == 0 ? 4 : 3;
    monkeys[3].tests = (divisible: number) => divisible % 3 == 0 ? 4 : 6;
    monkeys[4].tests = (divisible: number) => divisible % 2 == 0 ? 0 : 6;
    monkeys[5].tests = (divisible: number) => divisible % 11 == 0 ? 2 : 3;
    monkeys[6].tests = (divisible: number) => divisible % 17 == 0 ? 0 : 1;
    monkeys[7].tests = (divisible: number) => divisible % 5 == 0 ? 2 : 5;

    // part1(monkeys)
    part2(monkeys)
})

function part1(monkeys: Monkey[]) {
    // 20 rounds
    for (let i=0; i<20; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                let newItem = monkey.operation(Number(item));
                newItem = Math.floor(newItem/3)
                let throwTo = monkey.tests(newItem)
                monkeys[throwTo].items.push(newItem);
                monkey.inspections++
            })
            monkey.items = []
        })
        console.log("round "+ (i+1))
    }

    monkeys = monkeys.sort((a, b) => b.inspections-a.inspections)

    console.log(monkeys[0].inspections * monkeys[1].inspections)
}

function part2(monkeys: Monkey[]) {
    // demo
    // const kgv = (23*19*13*17)
    const kgv = 7*19*13*3*2*11*17*5
    for (let i=0; i<10000; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                let newItem = monkey.operation(Number(item));
                let throwTo = monkey.tests(newItem)
                newItem %= kgv
                monkeys[throwTo].items.push(newItem);
                monkey.inspections++
            })
            monkey.items = []
        })
        console.log("round "+ (i+1))
    }

    monkeys = monkeys.sort((a, b) => b.inspections-a.inspections)

    console.log(monkeys[0].inspections * monkeys[1].inspections)
}