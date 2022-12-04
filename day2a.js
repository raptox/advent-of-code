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
    let guide2 = ["X", "Y", "Z"];

    let player1 = guide1.indexOf(oppenent);
    let player2 = guide2.indexOf(you);

    if ( player1 > player2 && player1-player2 == 1) {
        return score[player2];
    } else if (player1 == player2) {
        return score[player2] + 3;
    } else if (player2 > player1 && player2-player1 == 2) {
        return score[player2];
    } else {
        return score[player2] + 6;
    }
}