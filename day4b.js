const fs = require('fs');
const filename = 'day4.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    let sum = 0;
    lines.forEach((line, index) => {
        let assignments = line.split(",");
        let areas1 = assignments[0].split("-");
        let areas2 = assignments[1].split("-");

        if (+areas1[0] <= +areas2[0] && +areas1[1] >= +areas2[0]) {
            sum++;
        } else if (+areas1[1] >= +areas2[1] && +areas1[0] <= +areas2[1]) {
            sum++
        } else if (+areas2[0] <= +areas1[0] && +areas2[1] >= +areas1[0]) {
            sum++;
        } else if (+areas2[1] >= +areas1[1] && +areas2[0] <= +areas1[1]) {
            sum++
        } else if (+areas1[0] <= +areas2[0] && +areas1[1] >= +areas2[1]) {
            sum++;
        } else if (+areas2[0] <= +areas1[0] && +areas2[1] >= +areas1[1]) {
            sum++;
        }
    })
    console.log(sum);
});