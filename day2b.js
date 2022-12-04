var fs = require('fs');
var filename = 'puzzle2.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const rounds = data.split('\n');

    let sum = 0;
    rounds.forEach((round, i) => {
        let players = round.split(' ');
        sum += getScore(players[0], players[1]);
    });
    console.log(sum);
});

function getScore(oppenent, you) {
    let score = [1, 2, 3];
    let guide1 = ["A", "B", "C"];

    if (you == "X") {
        return score[guide1.indexOf(getLose(oppenent))];
    } else if (you == "Y") {
        return 3 + score[guide1.indexOf(oppenent)];
    } else if (you == "Z") {
        return 6 + score[guide1.indexOf(getWin(oppenent))];
    }
}

function getLose(opponent) {
    switch (opponent) {
        case "A": return "C";
        case "B": return "A";
        case "C": return "B";
    }
}

function getWin(opponent) {
    switch (opponent) {
        case "A": return "B";
        case "B": return "C";
        case "C": return "A";
    }
}