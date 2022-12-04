const fs = require('fs');
const filename = 'day3-input.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    let scoreLowerCase = "abcdefghijklmnopqrstuvwxyz";
    let scoreUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let sum = 0;
    lines.forEach(rucksack => {
        let compartments = splitInCompartments(rucksack);
        let commonItem = [...compartments[0]].find(item => compartments[1].indexOf(item) !== -1);
        if (scoreLowerCase.indexOf(commonItem) !== -1) {
            sum += scoreLowerCase.indexOf(commonItem) + 1;
        } else if (scoreUpperCase.indexOf(commonItem) !== -1) {
            sum += scoreUpperCase.indexOf(commonItem) + 1 + 26;
        }
    })
    console.log(sum);
});

function splitInCompartments(rucksack) {
    let compartments = [];
    compartments[0] = rucksack.substring(0,rucksack.length/2);
    compartments[1] = rucksack.substring(rucksack.length/2, rucksack.length);
    return compartments;
}