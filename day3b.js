const fs = require('fs');
const filename = 'day3-input.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    let scoreLowerCase = "abcdefghijklmnopqrstuvwxyz";
    let scoreUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let sum = 0;
    let group = [];
    lines.forEach((rucksack, index) => {
        if (index % 3 === 0 && index !== 0) {
            group = [];
        }

        group.push(rucksack);

        if (group.length === 3) {
            let commonItem = [...group[0]].find(item =>
                group[1].indexOf(item) !== -1 && group[2].indexOf(item) !== -1);

            if (scoreLowerCase.indexOf(commonItem) !== -1) {
                sum += scoreLowerCase.indexOf(commonItem) + 1;
            } else if (scoreUpperCase.indexOf(commonItem) !== -1) {
                sum += scoreUpperCase.indexOf(commonItem) + 1 + 26;
            }
        }
    })
    console.log(sum);
});